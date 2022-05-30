import '../component/case-province.js';
import DataSource from '../data/data-source.js';

function main() {

    const getSummary = async () => {
        try {
            const resultSummary = await DataSource.getSummary();
            renderSummary(resultSummary);
        } catch (resultError) {
            renderError(resultError);
        }
    };

    const getProvince = async (keyword) => {
        try {
            const resultProvince = await DataSource.getProvince(keyword);
            renderProvince(resultProvince);
        } catch (resultError) {
            renderError(resultError);
        }
    };

    const getListProvince = async () => {
        try {
            const [listProvinces, maxProvinces, minProvinces] = await DataSource.getListProvince();
            renderOptionProvince(listProvinces);
            renderMaxMinProvince(maxProvinces, minProvinces);
        } catch (resultError) {
            renderError(resultError);
        }
    };

    const getDailyCases = async () => {
        try {
            const resultDaily = await DataSource.getDailyCases();
            renderChart(resultDaily);
        } catch (resultError) {
            renderError(resultError);
        }
    };

    const renderSummary = (resultSummary) => {
        const jumlahKasusElement = document.querySelector("#jumlah-kasus");
        const perawatanElement = document.querySelector("#perawatan");
        const sembuhElement = document.querySelector("#sembuh");
        const meninggalElement = document.querySelector("#meninggal");

        jumlahKasusElement.innerHTML = `${resultSummary.jumlahKasus}`;
        perawatanElement.innerHTML = `${resultSummary.perawatan}`;
        sembuhElement.innerHTML = `${resultSummary.sembuh}`;
        meninggalElement.innerHTML = `${resultSummary.meninggal}`;
    };

    const renderProvince = (resultProvince) => {
        const caseProvinceElement = document.querySelector("case-province");
        caseProvinceElement.data = resultProvince;
    };

    const renderOptionProvince = (listProvinces) => {
        const listProvinceElement = document.querySelector("#option-province");

        listProvinces.forEach((listProvince) => {
            listProvinceElement.innerHTML += `<option value="${listProvince}">${listProvince}</option>`;
        });

        listProvinceElement.addEventListener("change", (event) => {
            getProvince(event.target.value);
        });
    };

    const renderMaxMinProvince = (maxProvinces, minProvinces) => {
        const maxProvinceElement = document.querySelector("#max-province");
        const minProvinceElement = document.querySelector("#min-province");

        maxProvinces.forEach((maxProvince, index) => {
            maxProvinceElement.innerHTML += `
                <div class="d-flex align-items-center m-2">
                    <div class="d-flex justify-content-center align-items-center rounded-circle number bg-dark text-white">${index + 1}</div>
                    <div class="d-flex flex-column m-2">
                        <div>${maxProvince.provinsi}</div>
                        <div>${maxProvince.kasusPosi} cases</div>
                    </div>
                </div>`;
        });

        minProvinces.forEach((minProvince, index) => {
            minProvinceElement.innerHTML += `
                <div class="d-flex align-items-center m-2">
                    <div class="d-flex justify-content-center align-items-center rounded-circle number bg-dark text-white">${index + 1}</div>
                    <div class="d-flex flex-column m-2">
                        <div>${minProvince.provinsi}</div>
                        <div>${minProvince.kasusPosi} cases</div>
                    </div>
                </div>`;
        });
    };

    const renderChart = (dailyCases) => {
        let dataX = [], dataY = [], total = 0;
        dailyCases.forEach((dailyCase) => {
            total += dailyCase.jumlahKasusBaruperHari;

            dataX.push(dailyCase.harike);
            dataY.push(total);
        });

        const caseChartElement = document.querySelector("#case-chart");

        const chart = new Chart(caseChartElement, {
            type: 'line',
            data: {
                labels: dataX,
                datasets: [{
                    label: 'Cumulative Cases per Day',
                    data: dataY,
                    borderColor: 'rgba(255, 0, 0, 1)',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                }]
            },
            options: {
                maintainAspectRatio: false,
            }
        });
    };

    const renderError = (resultError) => {
        const errorMessageElement = document.querySelector("#error-message");

        errorMessageElement.innerHTML = `${resultError}`;
        errorMessageElement.parentNode.classList.remove("d-none");
    };

    document.addEventListener("DOMContentLoaded", () => {
        getSummary();
        getProvince();
        getListProvince();
        getDailyCases();
    });
}

export default main;