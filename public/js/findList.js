
document.getElementById("szukacz").addEventListener('input', (event) => {
    const wpisywane = event.target.value.toLowerCase()

    fetch("/findList", { method: "POST", body: JSON.stringify({ valueText: wpisywane }), headers: { "Content-Type": "application/json" } })
        .then((res) => (res.json()))
        .then((produkty) => {
            document.getElementById('lista').innerHTML = ""
            produkty.forEach(element => createListElement(element, "lista"))


        })
})





function createListElement(elem, listID) {
    const lista = document.getElementById(listID)
    const guziki = document.createElement('button')
    guziki.classList.add("guziczki")
    const produkt = document.createElement("li")
    produkt.classList.add("listaProduktów")
    produkt.innerText = elem.name
    lista.appendChild(produkt)
    produkt.appendChild(guziki)
    guziki.addEventListener('click', () => createTableElement(elem))
}


function createTableElement(elem) {

    const table = document.getElementById('table')
    const tr = document.createElement("tr")
    const tdI = document.createElement('td')
    const input = document.createElement('input')
    input.defaultValue = '100'
    input.classList.add('ileG')
    tdI.appendChild(input)
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    td2.classList.add('B')
    const td3 = document.createElement('td')
    td3.classList.add('W')
    const td4 = document.createElement('td')
    td4.classList.add('T')
    const td5 = document.createElement('td')
    td5.classList.add('K')
    const tdB = document.createElement('td')
    const buttonRemove = document.createElement('button')
    buttonRemove.addEventListener('click', function () {
        removeProductFromTable(this.parentNode.parentNode)
    })
    buttonRemove.classList.add('remove')
    tdB.appendChild(buttonRemove)

    td1.innerText = elem.name
    td2.innerText = elem.B
    td3.innerText = elem.W
    td4.innerText = elem.T
    td5.innerText = (elem.B) * 4 + (elem.W) * 4 + (elem.T) * 9

    table.appendChild(tr)
    tr.appendChild(tdI)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(tdB)

    changeTdValue(input, elem, td2, td3, td4, td5)
    sumColumns()
}

function removeProductFromTable(item) {
    item.remove()
    sumColumns()
}

function changeTdValue(input, elem, td2, td3, td4, td5) {
    input.addEventListener('change', (event) => {

        td2.innerText = (event.target.value * elem.B) / 100
        td3.innerText = (event.target.value * elem.W) / 100
        td4.innerText = (event.target.value * elem.T) / 100
        td5.innerText = (td2.innerText) * 4 + (td3.innerText) * 4 + (td4.innerText) * 9
        sumColumns()
    })


}

function sumColumns() {
    const s1 = document.getElementById('s1')
    const s2 = document.getElementById('s2')
    const s3 = document.getElementById('s3')
    const s4 = document.getElementById('s4')
    const tdB = document.getElementsByClassName("B")
    const tdW = document.getElementsByClassName("W")
    const tdT = document.getElementsByClassName("T")
    const tdK = document.getElementsByClassName("K")

    sumColumn(tdB, s1)
    sumColumn(tdW, s2)
    sumColumn(tdT, s3)
    sumColumn(tdK, s4)

}

function sumColumn(td, s) {
    var arr = Array.from(td)
    var numbers = arr.map(element => {
        return parseInt(element.innerHTML)
    })
    s.innerHTML = numbers.reduce(function (a, b) {
        return a + b;
    }, 0);
}