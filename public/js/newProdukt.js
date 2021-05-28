
document.getElementById("add").addEventListener("click", function () {

    let name = document.getElementById("name").value
    let B = document.getElementById("B").value
    let W = document.getElementById("W").value
    let T = document.getElementById("T").value
    const obj = { name, B, W, T }
    if (B < 100 && W < 100 && T < 100 && name != '') {

        fetch("/newProduct", { method: "POST", body: JSON.stringify({ "name": name.toLowerCase(), "B": B, "W": W, "T": T }), headers: { "Content-Type": "application/json" } })
            .then((res) => res.json())
            .then(res => alert(res))

        document.getElementById("name").value = ""
        document.getElementById("B").value = ""
        document.getElementById("W").value = ""
        document.getElementById("T").value = ""

    }
    else alert('coś poszlo nie tak')

    createTableElement(obj)

})






