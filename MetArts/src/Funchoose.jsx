import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import img from './assets/bk2.jpg' ;
import img1 from './assets/bk3.jpg' ;
import img2 from './assets/saved.jpg' ;
import img3 from './assets/graph.jpg' ;

export function Funchoose() {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: 'center',
      padding: '50px',
      background: `url("${img}") no-repeat center center fixed`,
      backgroundSize: 'cover',
      minHeight: '100vh'
    }}>
     <h1 className="custom-font">MetArts</h1>
      <h1>Choose Your Fun</h1>
      <div className="d-flex justify-content-center flex-wrap">
        <Card
          className="m-3"
          style={{ width: '18rem', cursor: 'pointer', transition: 'transform 0.2s' }}
          onClick={() => navigate('/Drawing')}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Card.Img variant="top" src={img1} />
          <Card.Body>
            <Card.Title>Go to Drawing Pad</Card.Title>
            <Card.Text>Create your own drawings</Card.Text>
            <Button variant="primary" onClick={() => navigate('/Drawing')}>Go to Drawing Pad</Button>
          </Card.Body>
        </Card>
        <Card
          className="m-3"
          style={{ width: '18rem', cursor: 'pointer', transition: 'transform 0.2s' }}
          onClick={() => navigate('/savedDraw')}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Card.Img variant="top" src={img2} />
          <Card.Body>
            <Card.Title>View Saved Drawings</Card.Title>
            <Card.Text>See your previous masterpieces</Card.Text>
            <Button variant="success" onClick={() => navigate('/savedDraw')}>View Saved Drawings</Button>
          </Card.Body>
        </Card>
        <Card
          className="m-3"
          style={{ width: '18rem', cursor: 'pointer', transition: 'transform 0.2s' }}
          onClick={() => navigate('/GraphDraw')}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Card.Img variant="top" src={img3} />
          <Card.Body>
            <Card.Title>Draw Graphs</Card.Title>
            <Card.Text>Graph mathematical functions</Card.Text>
            <Button variant="info" onClick={() => navigate('/GraphDraw')}>Draw Graphs</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
