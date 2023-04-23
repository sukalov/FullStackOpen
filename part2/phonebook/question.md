***DISCLAIMER**: i'm new at React, and just trying to build good habits.*

So, the example would be a simple contacts app, where you type in names, and all the names are rendered below the input field. [pic.1 simple contacts app mechanics](https://i.stack.imgur.com/rDuIG.png)

First, and the most intuitive way, of making this work is using `useState()` hook with our input field. It's also widely suggested in tutorials around the web.

*<figcaption>method 1 with `useState()`:</figcaption>*

```react 
const [inputState, setInputState] = useState('');
const [people, setPeople] = useState([]);

const onChange = (event) => {
  setInputState(event.target.value)
}

const onSubmit = (e) => {
  e.preventDefault()
  setPeople([...people, inputState])
  setInputState('')   // pay extra attention to this line
}
// ...

<form onSubmit={onSubmit}>
  <input onChange={onChange} value={inputState} />
</form>

//...

```
Looks simple enough. We have `inputState`, that is up-to-date with input field because of `onChange` function. **However (!!!)**, in [this video about common react-hook mistakes](https://www.youtube.com/watch?v=GGo3MVBFr1A&t=232s), Kyle points, that this method isn't the optimal one, cause it makes the whole page re-render every time we change input value. So, he suggests using `useRef()` hook instead.

*<figcaption>method 2 with `useRef()`:</figcaption>*

```react 
const [people, setPeople] = useState([]);
const inputRef = useRef([]);

const onSubmit = (e) => {
  e.preventDefault()
  setPeople([...people, inputRef.current.value])
  // inputRef.current.value = ''   <==  won't work
}
// ...

<form onSubmit={onSubmit}>
  <input ref={inputRef} />
</form>

//...

```

The second method works fine, and re-renders the page only once, when the submit event happens. However, we are going to submit this form multiple times, so we want `onSubmit` function to clear the input value. If we try adding `inputRef.current.value = '';` in the end of `onSubmit` function, it breaks our app. The reason must be that setting state is asynchronous, so it ends up with updating state after making input value empty. To resolve it we can use another hook, `useEffect()`, which will clear our input value only after our stateful element is updated

*<figcaption>method 2  **updated** with `useEffect()`:</figcaption>*

```react 
const [people, setPeople] = useState([]);
const inputRef = useRef([]);

useEffect(() => inputRef.current.value = '', [people])

const onSubmit = (e) => {
  e.preventDefault()
  setPeople([...people, inputRef.current.value])
}
// ...

<form onSubmit={onSubmit}>
  <input ref={inputRef} />
</form>

//...

```

**Finally.** *What's the question??*

We have these two methods: 

- First one is intuitive, using simple mechanics, using just one hook, BUT re-rendering the page multiple times.

- Second one uses as much as three different hooks, more complex mechanics, BUT re-renders only on submit.

Which should I use? Which could be considered the *correct* one? Or maybe I'm missing something and the answer is 'neither'?

I'd appreciate your thoughts and suggestions!