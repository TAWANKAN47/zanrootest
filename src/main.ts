type Range = [number, number];

function RangeMerge(range: Range[]):Range[] {
  if(range.length === 0)return [];

  const sortedRange = [...range].sort((a,b)=> a[0] - b[0]); 
  const mergedRange: Range[] = [[sortedRange[0][0], sortedRange[0][1]]];
  
  for(let i =1; i< sortedRange.length; i++){
    const current = sortedRange[i];
    const lastMerged = mergedRange[mergedRange.length - 1];

    if(current[0] <= lastMerged[1]){
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    }else{
      mergedRange.push([current[0], current[1]]);
    }
  }
  return mergedRange;
}

  function subRange (inputRange: Range[], negativeRange: Range[]): Range[] {
    const ranges = RangeMerge(inputRange);
    const negatives = RangeMerge([negativeRange]);
    const result: Range[] = [];
    let indexNeg = 0;

    for(const [start, end] of ranges){
      let currentStart = start;
      const currentEnd = end;
      while(indexNeg < negatives.length && negatives[indexNeg][1] < currentStart){
        indexNeg++;
      }
      let i=indexNeg;
      
      while(i< negatives.length && negatives[i][0] <= currentEnd){
        const [negStart, negEnd] = negatives[i];
        if(negStart > currentStart){
          result.push([currentStart, Math.min(negStart-1, currentEnd)]);
        }
        currentStart = Math.max(currentStart, negEnd + 1);

        if(currentStart > currentEnd){
          break;
        }
        i++;
        if(currentStart <= currentEnd){
          result.push([currentStart, currentEnd]);

        }
      }
    }
    return result;
  }

  console.log (subRange([[1, 5],[2,20]]));


