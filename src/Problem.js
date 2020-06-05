import React from 'react';
import Container from '@material-ui/core/Container';
import { Tags } from './Tags';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import SyntaxHighlighter from 'react-syntax-highlighter';

export function Problem({ problem, setTag }) {
  return (
    <Container maxWidth="lg">
      <br />
      <Title title={problem['title']} source={problem['source']} />
      <Tags updateRows={setTag} tags={problem['tags']} />
      <Approach approach={problem['approach']} />
      <Code docco={docco} code={problem['code']} />
      <br />
    </Container>
  );
}

function Title({ title, source }) {
  return (
    <Typography variant="h3" align="left" color="textPrimary" gutterBottom>
      {source ? (
        <Link target={'_blank'} color={'inherit'} href={source}>
          {title}
        </Link>
      ) : (
        title
      )}
    </Typography>
  );
}

function Approach({ approach }) {
  if (!approach) return null;
  return (
    <div className="approach">
      <Typography variant="h5" align="left" color="textPrimary" gutterBottom>
        Approach
      </Typography>
      <Typography
        style={{
          whiteSpace: 'pre-wrap',
        }}
        variant="body2"
        align="left"
        color="textPrimary"
        gutterBottom
      >
        {approach}
      </Typography>
    </div>
  );
}

function Code({ code }) {
  if (!code) return null;
  return (
    <SyntaxHighlighter language="java" style={docco} wrapLines={true}>
      {code}
    </SyntaxHighlighter>
  );
}
