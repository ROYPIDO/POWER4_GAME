function generateTable() {
    const table = document.createElement('table')
    let y = 0;
    while (y < 6)
    {
        const tr = document.createElement('tr')
        let x = 0;
        while (x < 7)
        {
            const td = document.createElement('td')
            td.id = (x+1) + '.' + (y+1)
            td.value = 0
            td.addEventListener('click', putJetton)
            tr.appendChild(td)
            x = x + 1
        }
        table.appendChild(tr)
        y = y + 1
    }
    document.getElementById('game').appendChild(table)
}

function putJetton(event, target) {
    if (victory)
        return
    target = target === undefined ? event.target : target
    const column = target.id.split('.')[0]
    let row = 6
    while (row > 1 && document.getElementById(column + '.' + row).value !== 0)
        row = row - 1
    const td = document.getElementById(column + '.' + row)
    td.value = player

    const token = document.createElement('div')
    token.classList.add('token', player ? 'red' : 'yellow')
    token.addEventListener('click', function (event) {
        putJetton(event, td)
    })
    td.appendChild(token)

    player = !player
    gameOver(td)
}

function gameOver(token) {
    const [column, row] = token.id.split('.')
    const verticalWin = () => {
        let count = 1
        let y = row
        while (y++ < 6 && document.getElementById(column + '.' + y).value === token.value) {
            count = count + 1
            if (count > 3)
                return token.value
        }
        return 0
    }

    const horizontalWin = () => {
        let count = 1
        let xRight = column
        let xLeft = column
        while ((xLeft-- > 1 && document.getElementById(xLeft + '.' + row).value === token.value)
        || (xRight++ < 7 && document.getElementById(xRight + '.' + row).value === token.value)) {
            count = count + 1
            if (count > 3) {
                return token.value
            }
        }
        return 0
    }

    const diagoRight = () => {
        let count = 1
        let x = column
        let y = row
        let xBis = column
        let yBis = row
        while ((x++ < 7 && y-- > 1 && document.getElementById(x  + '.' + y).value === token.value)
        || (xBis-- > 1 && yBis++ < 6 && document.getElementById(xBis + '.' + yBis).value === token.value))
        {
            count = count + 1
            if (count > 3)
                return token.value
        }
        return 0
    }

    const diagoLeft = () => {
        let count = 1
        let x = column
        let y = row
        let xBis = column
        let yBis = row
        while ((x-- > 1 && y-- > 1 && document.getElementById(x + '.' + y).value === token.value)
            || (xBis++ < 7 && yBis++ < 6 && document.getElementById(xBis + '.' + yBis).value === token.value))
        {
            count = count + 1
            if (count > 3)
                return token.value
        }
        return 0
    }

    if (verticalWin() !== 0 || horizontalWin() !== 0 || diagoLeft() !== 0 || diagoRight() !== 0) {
        console.log('VICTOIRE de ' + (token.value ? 'ROUGE' : 'JAUNE'))
        victory = true
    }
}

let player = true
let victory = false
generateTable()
