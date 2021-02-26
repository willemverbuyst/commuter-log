<script>
  import Bar from 'svelte-chartjs/src/Bar.svelte';
  import 'chartjs-plugin-datalabels';
  import { workingDays } from '../../dummyData';
  import { formatDataLabels, getWeekData } from '../../helpers/chartLogic';

  const {
    travelTimes,
    backgroundColor,
    labels,
    maxForDisplay,
    title,
  } = getWeekData(workingDays, 4);

  let data = {
    labels,
    datasets: [
      {
        data: travelTimes,
        backgroundColor,
        borderWidth: 0,
        barPercentage: 1,
      },
    ],
  };

  let options = {
    title: {
      display: true,
      text: title,
    },
    maintainAspectRatio: true,
    legend: {
      display: false,
    },
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
            beginAtZero: true,
            suggestedMax: maxForDisplay,
          },
        },
      ],
    },
    tooltips: {
      enabled: false,
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        display: true,
        color: '#170a3a',
        formatter: (value) => formatDataLabels(value),
      },
    },
  };
</script>

<div class="chart-container">
  <Bar {data} {options} />
</div>

<style>
  .chart-container {
    max-width: 600px;
    margin: 4rem auto;
  }
</style>