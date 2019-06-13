Vue.component("textual-range", {
  template: `
  
  <table class="responsive-table">
  <thead>
    <tr>
        <th> Apecto </th>
        <th>%</th>
        <th>Rango</th>
        <th>Diagnóstico</th>
        <th>Recomendaciones</th>
    </tr>
  </thead>

  <tbody>
  
    <tr v-for="value in valuesBuilt">
      <td><b>{{value.aspect}}</b></td>
      <td><b>{{value.value}}%</b></td>
      <td><b>{{value.range}}</b></td>
      <td style="text-align:justify">{{value.diagnosis}}</td>
      <td style="text-align:justify">{{value.recommendation}}</td>
    </tr>
  
  </tbody>
</table>
      
  `,
  props: ["textualRangeData"],
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
      // console.log(this.textualRangeData)
      this.textualRangeData
        // .sort((a, b) => {
        //   if (a.aspect > b.aspect) return 1;
        //   if (a.aspect < b.aspect) return -1;
        // })
        .forEach(element => {
          var value = parseInt((element.value / 10) / 2);
          var aspect = element.aspect;
          let textualRange = this.textualRanges.find(textualRange => {
            return ((parseInt(textualRange.rangeNum) == value) && (textualRange.title == aspect));
          });

          console.log(element.value)

          this.valuesBuilt.push({
            aspect,
            range: value,
            value: element.value,
            diagnosis: textualRange.diagnosis,
            recommendation: textualRange.recommendations
          })
        });

      // console.log(this.valuesBuilt);

    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this.textualRangeData)
    }, 1000);
    this.getTextualRanges();
  }
})