import "regenerator-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import "chart.js/dist/Chart.min.js";
import "./styles/main.css";
import IndonesiaMap from './images/indonesia-map.png';
import main from "./scripts/view/main.js";

// function resizeCanvas (maxWidth) {
//     const caseChartElement = document.querySelector("#case-chart");
//     caseChartElement.setAttribute("height", "100");

//     if(maxWidth.matches) {
//         caseChartElement.setAttribute("width", "100");
//     } else {
//         caseChartElement.setAttribute("width", "225");
//     }
// };
  
// const maxWidth = window.matchMedia("(max-width: 768px)");
// resizeCanvas(maxWidth);
// maxWidth.addListener(resizeCanvas);

const bannerElement = document.querySelector("#banner");
bannerElement.innerHTML += `<img src="${IndonesiaMap}" class="img-fluid w-50" alt="Responsive image">`;

main();