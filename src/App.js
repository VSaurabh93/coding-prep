import React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';
import AppBar from '@material-ui/core/AppBar';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import GitHubForkRibbon from 'react-github-fork-ribbon'; 
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  loader: {
    position: 'absolute', left: '50%', top: '40%',
    transform: 'translate(-50%, -50%)',
  }
}));
  
export default function App() {
  const classes = useStyles();

  const [ rows, _setRows ] = useState([]);
  const [ tag, setTag ] = React.useState('all');
  const [ isLoading, setIsLoading ] = useState(true);

  const handleChange = (event) => {
    setTag(event.target.value);
    console.log(event.target.value);
    // _setRows(rows.filter(row => {
    //   return row.props.children[3].props.children[1].split(',').includes(event.target.value);
    // }));
  };

  useEffect(() => {
    const url = "https://raw.githubusercontent.com/kunwardeeps/coding-prep/master/Leetcode_Approach.xlsx";
    fetch(url).then(function(res) {
      /* get the data as a Blob */
      if(!res.ok) throw new Error("fetch failed");
      return res.arrayBuffer();
    }).then(ab => {
      /* parse the data when it is received */
      var data = new Uint8Array(ab);
      var workbook = XLSX.read(data, {type:"array"});
      //console.log(workbook.Sheets.Algos);
      setRows(workbook.Sheets.Algos);
      setIsLoading(false);
    });
  }, []);

  const setRows = (data) => {
    let rows = [];
    for (let i = 2; data['A' + i]; i++) {
        rows.push(
          <Container maxWidth="lg">
            <span>&nbsp;&nbsp;</span>
            <Typography variant="h3" align="left" color="textPrimary" gutterBottom>
              {data['A' + i].v}
            </Typography>
            {data['B' + i] && 
            <Typography variant="subtitle1" align="left" color="textSecondary" paragraph>
              <a href={data['B' + i].v}>Source</a>
            </Typography>}
            <Typography variant="subtitle1" align="left" color="textSecondary" paragraph>
              Tags: {data['C' + i].v}
            </Typography>
            {data['D' + i] &&
            <div className="approach">
              <Typography variant="h5" align="left" color="textPrimary" gutterBottom>
                Approach
              </Typography>
              {data['D' + i].v.split('\n').map(function(item, key) {
                return (
                  <Typography key={key} variant="body2" align="left" color="textPrimary" gutterBottom>
                    {item}
                  </Typography>
                )
              })}
            </div>}
            {data['E' + i] && 
            <SyntaxHighlighter language="java" style={docco} wrapLines={true}>
              {data['E' + i].v}
            </SyntaxHighlighter>}
            <span>&nbsp;&nbsp;</span>
          </Container>
        );
    }
    console.log(rows);
    _setRows(rows);
  };  
  
  return (
    isLoading? <CircularProgress className={classes.loader} size={200}/> :
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <GitHubForkRibbon position="right" 
                          color="green"
                          href="//github.com/kunwardeeps/coding-prep" 
                          target="_blank" > 
          Fork me on GitHub 
        </GitHubForkRibbon> 
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Coding Interview Prep
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              A compilation of frequently asked coding questions.
            </Typography>
            <div align="center">
              <Select
                labelId="select-tag-label"
                id="select-tag"
                value={tag}
                autoWidth={true}
                onChange={handleChange}> 
                <MenuItem value={'all'}>All</MenuItem>
                <MenuItem value={'arrays'}>Arrays</MenuItem>
                <MenuItem value={'backtracking'}>Backtracking</MenuItem>
                <MenuItem value={'bfs'}>BFS</MenuItem>
                <MenuItem value={'binary_search'}>Binary Search</MenuItem>
                <MenuItem value={'bit_manipulation'}>Bit Manipulation</MenuItem>
                <MenuItem value={'dfs'}>DFS</MenuItem>
                <MenuItem value={'dp'}>Dynamic Programming</MenuItem>
                <MenuItem value={'graph'}>Graph</MenuItem>
                <MenuItem value={'greedy'}>Greedy</MenuItem>
                <MenuItem value={'heap'}>Heap</MenuItem>
                <MenuItem value={'intervals'}>Intervals</MenuItem>
                <MenuItem value={'linked_list'}>Linked List</MenuItem>
                <MenuItem value={'search'}>Search</MenuItem>
                <MenuItem value={'sliding_window'}>Sliding Window</MenuItem>
                <MenuItem value={'sort'}>Sort</MenuItem>
                <MenuItem value={'string'}>String</MenuItem>
                <MenuItem value={'topological_sort'}>Topological Sort</MenuItem>
                <MenuItem value={'trie'}>Trie</MenuItem>
                <MenuItem value={'two_pointers'}>Two Pointers</MenuItem>
                <MenuItem value={'union_find'}>Union Find</MenuItem>
              </Select>
            </div>
          </Container>
          {rows.map((row, i) => <div key={i}>{row}</div>)}
        </div>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Coding Prep
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Thanks for visiting!
        </Typography>
      </footer>
    </React.Fragment>
  );
}