import { useState, useMemo, useEffect } from 'react'
//memo stands for memoization is idea of caching a value so you don't have to recompute it everytime

export default function App() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);
  const doubleNumber = useMemo(() => slowFunction(number), [number]);//number is the only changes, so when number changes we rerun the function running in useMemo. That way it's not called everytime the app re renders
  //Won't run until number changes. If number was the same as before the new render then it doesn't need to call slowFunction
  //only use useMemo when you need performance benefits when the function being called is super slow
  //another use for useMemo is referential equality: whjen you try to compare diff variables in JS its going to compare the reference
  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white': 'black'
    }
  }, [dark]);


  useEffect(() => {
    console.log('Theme Changed'); //will be called even if we change number, so need useMemo because every themeStyles object will have a difference ref in memory meaning it'll be diff everytime therefore this would be called every render
  }, [themeStyles]);
  return (
    <>
      <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
      <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
      <div style={themeStyles}>{doubleNumber}</div>
    </>
  )
}

function slowFunction(num) {
  console.log('Calling Slow Function')
  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2
}