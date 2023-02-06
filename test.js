const resultsContainer = document.querySelector(".results");


async function getData() {
    try {
        const response = await fetch("http://colormind.io/list/");
        const data = await response.json();
        let text = "";
        for (let i = 0; i < data.result.length; i++) {
          text += data.result[i] + "<br>";
        }
        
        resultsContainer.innerHTML = text;

    } catch (error) {
        console.error(error);
    }
}

getData();

