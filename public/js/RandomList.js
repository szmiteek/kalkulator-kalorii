fetch("https://gentle-fjord-71055.herokuapp.com/random", { method: "GET", headers: { "Content-Type": "application/json" } })
    .then((res) => (res.json()))
    .then((produkty) => {

        produkty.forEach(element => createListElement(element, "randomList"))



    })

