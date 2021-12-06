import React, { useState, useEffect } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Conecta from './Conecta';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Grafico = () => {
  const [classes, setClasses] = useState([])

  const getClasses = async () => {
    const lista = await Conecta.get("classes")
    setClasses(lista.data)
  }

  useEffect(() => {
    getClasses()
  }, [])

  console.log(classes)
  let labels = [classes.map((classe) => classe.name)];
  labels = labels[0]
  console.log(labels)
  let data1 = [classes.map((classe) => classe.strength)]
  data1 = data1[0]
  let data2 = [classes.map((classe) => classe.vitality)]
  data2 = data2[0]
  let data3 = [classes.map((classe) => classe.dexterity)]
  data3 = data3[0]
  let data4 = [classes.map((classe) => classe.inteligence)]
  data4 = data4[0]

  const options = {
    chartArea: { width: '10%' },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Atributos de classe',
      },
    },
  };

  const labels2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const data={
    labels,
    data: [12, 19, 3, 5, 8 ,10, 15, 20],
    datasets: [
      {
        label: 'Strength',
        data: data1,
        backgroundColor: 'rgba(255, 255, 102, 0.5)',
      },
      {
        label: 'Vitality',
        data: data2,
        backgroundColor: 'rgba(255, 51, 0, 0.5)',
      },
      {
        label: 'Dexterity',
        data: data3,
        backgroundColor: 'rgba(0, 255, 153, 0.5)',
      },
      {
        label: 'Inteligence',
        data: data4,
        backgroundColor: 'rgba(0, 51, 204, 0.5)',
      },
    ]
  }

  return (
    <Bar options={options} data={data} />
    
  );
}



export default Grafico