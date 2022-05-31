class DataSource {

    static getSummary() {
        return fetch(`https://indonesia-covid-19.mathdro.id/api`)
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                if(responseJson) {
                    const summary = {
                        perawatan: responseJson.perawatan,
                        jumlahKasus: responseJson.jumlahKasus,
                        sembuh: responseJson.sembuh,
                        meninggal: responseJson.meninggal
                    };
                    return Promise.resolve(summary);
                } else {
                    return Promise.reject("Error: Summary data are not available.");
                }
            })
            .catch(error => {
                console.log("Error: Summary data are not available.", error);
                const summary = {
                    perawatan: Math.floor(Math.random() * 101),
                    jumlahKasus: Math.floor(Math.random() * 101),
                    sembuh: Math.floor(Math.random() * 101),
                    meninggal: Math.floor(Math.random() * 101)
                };
                return Promise.resolve(summary);
            })
    }

    static getProvince(keyword) {
        return fetch(`https://indonesia-covid-19.mathdro.id/api/provinsi`)
            .then(response => {
                return response.json()
            })
            .then(responseJsons => {
                if(responseJsons) {
                    const filteredProvince = responseJsons.data.filter((responseJson) => {
                        return responseJson.provinsi == keyword;
                    });

                    if(!filteredProvince.length) {
                        const nullProvince = {
                            kasusPosi: "empty",
                            kasusSemb: "empty",
                            kasusMeni: "empty"
                        }
                        return Promise.resolve(nullProvince);
                    } else {
                        return Promise.resolve(filteredProvince[0]);
                    }
                } else {
                    return Promise.reject("Error: Province data are not available.");
                }
            })
            .catch(error => {
                console.log("Error: Province data are not available.", error);
                const province = {
                    kasusPosi: Math.floor(Math.random() * 101),
                    kasusSemb: Math.floor(Math.random() * 101),
                    kasusMeni: Math.floor(Math.random() * 101)
                };
                return Promise.resolve(province);
            })
    }

    static getListProvince() {
        return fetch(`https://indonesia-covid-19.mathdro.id/api/provinsi`)
            .then(response => {
                return response.json()
            })
            .then(responseJsons => {
                if(responseJsons) {
                    const listProvinces = responseJsons.data
                        .filter((responseJson) => {
                            return responseJson.provinsi != "Indonesia";
                        })
                        .map((responseJson) => {
                            return responseJson.provinsi;
                        })
                        .sort();
                    const maxProvinces = responseJsons.data.slice(0, 5);
                    const minProvinces = responseJsons.data.slice(-6, -1).reverse();
                    return Promise.resolve([listProvinces, maxProvinces, minProvinces]);
                } else {
                    return Promise.reject("Error: List province data are not available.");
                }
            })
            .catch(error => {
                console.log("Error: List province data are not available.", error);
                const responseJsons = [
                    {
                        provinsi: 'Jakarta',
                        kasusPosi: Math.floor(Math.random() * 101),
                    },
                    {
                        provinsi: 'Bali',
                        kasusPosi: Math.floor(Math.random() * 101),
                    },
                    {
                        provinsi: 'Bandung',
                        kasusPosi: Math.floor(Math.random() * 101),
                    },
                    {
                        provinsi: 'Surabaya',
                        kasusPosi: Math.floor(Math.random() * 101),
                    },
                    {
                        provinsi: 'Yogyakarta',
                        kasusPosi: Math.floor(Math.random() * 101),
                    },
                ];
                const listProvinces = ['Jakarta', 'Bali', 'Bandung', 'Surabaya', 'Yogyakarta'];
                const maxProvinces = responseJsons.slice(0, 5);
                const minProvinces = responseJsons.slice(-6, -1).reverse();
                return Promise.resolve([listProvinces, maxProvinces, minProvinces]);
            })
    }

    static getDailyCases() {
        return fetch(`https://indonesia-covid-19.mathdro.id/api/harian`)
            .then(response => {
                return response.json()
            })
            .then(responseJsons => {
                if(responseJsons) {
                    const dailyCases = responseJsons.data
                        .sort((a, b) => {
                            return a.harike - b.harike || b.tanggal - a.tanggal;
                        })
                        .reduce((prevReturned, responseJson) => {
                            const isSameDay = prevReturned.find((a) => {
                                return (a.harike == responseJson.harike);
                            });

                            if(!isSameDay) {
                                return prevReturned.concat([responseJson]);
                            } else {
                                return prevReturned;
                            }
                        }, []);
                    return Promise.resolve(dailyCases);
                } else {
                    return Promise.reject("Error: Daily cases data are not available."); 
                }
            })
            .catch(error => {
                console.log("Error: Daily cases data are not available.", error);
                let dailyCases = [];
                let day;
                for (day = 1; day <= 30; day++) {
                    dailyCases.push({
                        harike: day,
                        jumlahKasusBaruperHari: Math.floor(Math.random() * 101),
                    });
                }
                return Promise.resolve(dailyCases);
            })
    }
}

export default DataSource;