Vue.component("textual-range", {
  template: `

  
  <table>
  <thead>
    <tr>
        <th>Apecto</th>
        <th>Rango</th>
        <th>Diagnóstico</th>
        <th>Recomendaciones</th>
    </tr>
  </thead>

  <tbody>
    <tr v-for="element in data">
      <td> {{element.aspect}} </td>
      <td>Eclair</td>
      <td>$0.87</td>
    </tr>
  
  </tbody>
</table>
      

  `,
  props: ["data"],
  data() {
    return {
      textualRanges: [],
      valuesBuilt: []
    }
  },
  methods: {
    getTextualRanges() {
      axios.get("https://clima-laboral.human-express.com/php/textualRanges/read.php?query=*")
        .then(response => {
          this.textualRanges = response.data.textualRanges;
          this.compareData();
        })
    },
    compareData() {
      this.data.forEach(element => {
        var value = parseInt((element.value / 10) / 2);
        var fullValue = ((element.value / 10) / 2).toFixed(1);
        let textualRange = this.textualRanges.find(textualRange => {
          return parseInt(textualRange.rangeNum) == value;
        });
        console.log(textualRange);
        console.log(value);
        this.valuesBuilt.push({

        })
      });
    }
  },
  mounted() {
    this.getTextualRanges();
  }
})