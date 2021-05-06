const makeObjects = (data) => {

    const arrayOfObjects = Object.values(data)
  
    return arrayOfObjects.reduce((acc,curr)=>{
        
if(Object.keys(curr).length>1){
    const cdrObj = Object.values(curr).slice(1).reduce((acc2,curr2)=>{
        
       if(Object.keys(acc2).length<=0){
           acc2 = {confirmed:0, recovered:0, deaths:0}
        }else{
            acc2.confirmed += parseInt(curr2.confirmed)
            acc2.deaths += parseInt(curr2.deaths)
            acc2.recovered += parseInt(curr2.recovered)
        }
        return acc2
    },{})

    cdrObj.population = curr.All.population
    const obj = {}
    obj[curr.All.location] = cdrObj
    acc.push(obj)
    }else{
        
        const obj = {}
        const obj2 = {}
        obj2["confirmed"]=curr.All.confirmed
        obj2["deaths"]=curr.All.deaths
        obj2["recovered"]=curr.All.recovered
        obj2["population"]=curr.All.population
        obj[curr.All.location] = obj2
        acc.push(obj)
    }
return acc





    },[])

}


const fetchData = () => {
fetch("https://covid-api.mmediagroup.fr/v1/cases")
  .then(response => response.json())
  .then(data => console.log(makeObjects(data)));
}
fetchData()