let dataStats = {
    labels: ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'],
    datasets: [{
        label: '',
        borderSkipped: '',
        borderRadius: 8,
        

        backgroundColor: [
            'rgb(40, 167, 69)',
            'rgb(220, 53, 69)',
            'rgb(121, 182, 185)',
            'rgb(220, 53, 69)',
            'rgb(121, 182, 185)',
            'rgb(255, 153, 51)',
        ],
        borderColor: 'rgb(255, 99, 132)',
        data: [],
        //borderWidth: 1
    }]
}


function drawChart() {
    loadStatsData();
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: dataStats,
        options: {
            indexAxis: 'y',
           
            plugins: {
                legend: {
                    display: false
                },
               
                datalabels: {
                    display: true,
                    color: 'rgb(239, 239, 239)',
                },
            }
        }
    });


}


function loadStatsData() {
    dataStats['datasets'][0]['data'] = [];
    for (let i = 0; i < stats.length; i++) {
        dataStats['datasets'][0]['data'].push(stats[i]['base_stat']);
    }

}


