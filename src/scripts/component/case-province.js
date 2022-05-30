class CaseProvince extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    set data(data) {
        this._data = data;
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
            <style>
                /***** flexbox *****/
                .flex {
                    display: flex;
                    flex-wrap: wrap;
                }
                .flex-column {
                    flex-direction: column
                }
                .justify-content-between {
                    justify-content: space-between
                }
                .justify-content-center {
                    justify-content: center
                }
                .align-items-center {
                    align-items: center
                }
                
                /***** border *****/
                .border-rounded {
                    border: 2px solid;
                    border-radius: 10px;
                }
                .border-red {
                    border-color: red;
                }
                .border-green {
                    border-color: green;
                }
                .border-yellow {
                    border-color: yellow;
                }

                /***** sizing *****/
                .case-province {
                    margin: 15px;
                    padding: 10px;
                    height: 100px;
                    width: 25%;
                }
                @media screen and (max-width: 411px) {
                    .case-province {
                        width: 100%
                    }
                }
            </style>
            <div class="flex justify-content-between">
                <div class="flex flex-column justify-content-center align-items-center border-rounded border-yellow case-province">
                    <div id="jumlah-kasus-provinsi">
                        <h2>${this._data.kasusPosi}</h2>
                    </div>
                    <div>Confirmed</div>
                </div>
                <div class="flex flex-column justify-content-center align-items-center border-rounded border-green case-province">
                    <div id="sembuh-provinsi">
                        <h2>${this._data.kasusSemb}</h2>
                    </div>
                    <div>Recovered</div>
                </div>
                <div class="flex flex-column justify-content-center align-items-center border-rounded border-red case-province">
                    <div id="meninggal-provinsi">
                        <h2>${this._data.kasusMeni}</h2>
                    </div>
                    <div>Death</div>
                </div>
            </div>`;
    }
}

customElements.define("case-province", CaseProvince);