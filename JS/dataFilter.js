var fs=require('fs');
var r=require('readline');
var rd=r.createInterface(
  {
  input: fs.createReadStream('D:/workspace/javascript/CSV/crimeReport.csv')
  });
var heading=[];
var count=0;
var obj={},obj2={};
var final_array=[]
rd.on('line', function(line)
  {
  var value=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  if (count == 0)
  {
    heading =value;
    count=count+1;
  }
  else
  {
    if(value[5] =="THEFT" && value [6]=="OVER $500" && !obj[value[17]])
      {
        obj[value[17]]=1;
      }
    else if(value[5] =="THEFT" && value [6]=="OVER $500")
      {
        obj[value[17]]=obj[value[17]]+1;    
      }
    else if(value[5] =="THEFT"  && value [6]=="$500 AND UNDER" &&!obj2[value[17]])
      {
        obj2[value[17]]=1;
      }
    else if(value[5] =="THEFT"  && value [6]=="$500 AND UNDER")
      {
        obj2[value[17]] =obj2[value[17]]+1;
      }
  }
});
rd.on('close',function()
{
  for (var k in obj)
  {
    var json={"OVER $500":[],"$500 AND UNDER":[],"year":[],}
    json["OVER $500"]=obj[k];
    json["$500 AND UNDER"]=obj2[k];
    json["year"]=k;
    final_array.push(json);
  }
fs.writeFileSync('D:/workspace/javascript/JSON/dataVisualTheft.json',JSON.stringify(final_array),'utf8',function(err){console.log(err);});
console.log("done");
});