import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup, Form } from 'react-bootstrap';
import { FaSquare, FaCircle, FaDrawPolygon, FaBrush, FaEraser, FaSave, FaFileExport, FaTrashAlt, FaPalette, FaFill } from 'react-icons/fa';
import img1 from './assets/bk3.jpg' ;
import{getDatabase,ref,set,get,child} from "firebase/database";
import {auth,db} from "./firebase"
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import { getDoc,  setDoc,doc } from 'firebase/firestore';
import SavedDrawColumn  from './savedDrawColumn.jsx';
import { useLocation } from 'react-router-dom';
import paper from "paper";

const ToolBar = ({ selected, setSelected,setFillProperty, isFillSet,setFill,clearCanva,saveCanva,exportImage }) => {
  const handleSelection = (category, item) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      tool: category === 'tool' ? item : prevSelected.tool,
      color: category === 'color' ? item : prevSelected.color,
      size: category === 'size' ? item : prevSelected.size,
    }));
  };
  



  const [typePage,setPageType]= useState("Drawing");
 function setType(page){
    setPageType(page);
  }

  const buttonStyle = (isSelected) => ({
    width: '100%',
    backgroundColor: isSelected ? '#666' : 'transparent',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '10px'
  });

  const colorButtonStyle = (color, isSelected) => ({
    backgroundColor: color,
    border: 'none',
    width: '100%',
    padding: '10px',
    boxShadow: isSelected ? '0 0 10px 2px white' : 'none'
  });

  return (
    <>
   

    <div>   
    <div style={{ backgroundColor: 'black', padding: '20px', width: '200px', borderRadius: '10px', marginRight: '20px', marginLeft: '10px' }} >
      <Row>
        <Col>
          <h5 style={{ color: 'white' }}>Shapes</h5>
          <ButtonGroup vertical>
            <Button
              style={buttonStyle(selected.tool === 'Rectangle')}
              onClick={() => handleSelection('tool', 'Rectangle')}
            >
              <FaSquare style={{ marginRight: '10px' }} /> Rectangle
            </Button>
            <Button
              style={buttonStyle(selected.tool === 'Circle')}
              onClick={() => handleSelection('tool', 'Circle')}
            >
              <FaCircle style={{ marginRight: '10px' }} /> Circle
            </Button>
            <Button
              style={buttonStyle(selected.tool === 'Triangle')}
              onClick={() => handleSelection('tool', 'Triangle')}
            >
              <FaDrawPolygon style={{ marginRight: '10px' }} /> Triangle
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h5 style={{ color: 'white' }}>Drawing</h5>
          <ButtonGroup vertical>
            <Button
              style={buttonStyle(selected.tool === 'Brush')}
              onClick={() => handleSelection('tool', 'Brush')}
            >
              <FaBrush style={{ marginRight: '10px' }} /> Brush
            </Button>
            <Button
              style={buttonStyle(selected.tool === 'Eraser')}
              onClick={() => handleSelection('tool', 'Eraser')}
            >
              <FaEraser style={{ marginRight: '10px' }} /> Eraser
            </Button>
            <Button
              style={buttonStyle(isFillSet)}
              onClick={() =>setFillProperty(!setFill)}
            >
              <FaFill style={{ marginRight: '10px' }} /> Fill Color
            </Button>
          </ButtonGroup>
          <Form.Group controlId="formControlRange" className="mt-2">
            <Form.Label style={{ color: 'white' }}>Size</Form.Label>
            <Form.Control
              type="range"
              min='1'
              max='10'
              value={selected.size}
              onChange={(e) => handleSelection('size', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h5 style={{ color: 'white' }}>Colors</h5>
          <Row style={{marginBottom: "10px"}}>
            <Col>
              <Button
                style={colorButtonStyle('black', selected.color === 'black')}
                onClick={() => handleSelection('color', 'black')}
              ></Button>
            </Col>
            <Col>
              <Button
                style={colorButtonStyle('white', selected.color === 'white')}
                onClick={() => handleSelection('color', 'white')}
              ></Button>
            </Col>
            <Col>
              <Button
                style={colorButtonStyle('cyan', selected.color === 'cyan')}
                onClick={() => handleSelection('color', 'cyan')}
              ></Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                style={colorButtonStyle('red', selected.color === 'red')}
                onClick={() => handleSelection('color', 'red')}
              ></Button>
            </Col>
            <Col>
              <Button
                style={colorButtonStyle('green', selected.color === 'green')}
                onClick={() => handleSelection('color', 'green')}
              ></Button>
            </Col>
            <Col>
              <Button
                style={colorButtonStyle('blue', selected.color === 'blue')}
                onClick={() => handleSelection('color', 'blue')}
              ></Button>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Button
                style={colorButtonStyle('yellow', selected.color === 'yellow')}
                onClick={() => handleSelection('color', 'yellow')}
              ></Button>
            </Col>
            <Col>
              <Button
                style={colorButtonStyle('orange', selected.color === 'orange')}
                onClick={() => handleSelection('color', 'orange')}
              ></Button>
            </Col>
            <Col>
              <Button
                style={colorButtonStyle('purple', selected.color === 'purple')}
                onClick={() => handleSelection('color', 'purple')}
              ></Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button onClick={() => {exportImage();
                                     console.log("Phase 2")
          } } variant="outline-light" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10px' }}>
            <FaFileExport style={{ marginRight: '10px' }} /> Export Image
          </Button>
          <Button onClick={()=>saveCanva()} variant="outline-light" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10px', marginTop: '10px' }}>
            <FaSave style={{ marginRight: '10px' }} /> Save Image
          </Button>
          <Button onClick={() => {clearCanva();
                                     console.log("Phase 1")
          } } variant="outline-light" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10px', marginTop: '10px' }}>
            <FaTrashAlt style={{ marginRight: '10px' }} /> Clear Canva
          </Button>
        </Col>
      </Row>
    </div>
    </div>
  
    </>
  );
};





const ToolBarSelector = () => {
  const [selected, setSelected] = useState({
    shape: null,
    drawing: null,
    color: 'black',
    size: 1,
  });
  
  let isDrawing = false; 
  const [isFillSet, setFill] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const canvasRef = useRef();
  const projectRef = useRef(null);
  const [snapshot,setSnapShot]=useState(null);
  const [savedCanvas, setSavedCanvas] = useState(null);
  const [clearCanva, setClearCanva] = useState(false);
  const [saveImage, setImageSave] = useState(false);

  const fetchSavedImages = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please log in to view your saved images.");
        return;
      }

      const userId = user.uid;
      const imageRef = collection(db, `users/${userId}/images`);
      const snap = await getDocs(imageRef);
      const images = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedImages(images);
    } catch (error) {
      console.error("Error fetching images: ", error);
      alert("Failed to fetch images.");
    }
  };

  function clearingFunction() {
    if (projectRef.current) {
      projectRef.current.clear();
      setSavedCanvas(null);
      setSelectedImage(null);
      console.log("Canvas clear set to true");
    }
  }

  const savingFunction = async () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      alert("Canvas not found.");
      return;
    }

    const imageData = canvas.toDataURL("image/png");
    const imageHash = encodeURIComponent(Base64.stringify(sha256(imageData)));

    const user = auth.currentUser;

    if (!user) {
      alert("You need to log in to save your image.");
      return;
    }

    const userId = user.uid;
    const docRef = doc(db, `users/${userId}/images`, imageHash);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        await setDoc(docRef, {
          imageData,
          timestamp: Date.now(),
        }, { merge: true });
        alert("image updated");
      } else {
        await setDoc(docRef, {
          imageHash,
          imageData,
          timestamp: Date.now(),
        });
        alert("image saved");
      }
      setRefresh(prev => !prev);
    } catch (error) {
      console.log("image can't be saved", error);
      alert("failed to save image");
    }
  };

  const exportImage = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = url;
    link.download = `${Date.now()}.png`;
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    paper.setup(canvas);
    projectRef.current = paper.project;

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      paper.view.viewSize = new paper.Size(canvas.offsetWidth, canvas.offsetHeight);

      if (clearCanva) {
        clearingFunction();
        setClearCanva(false);
      }

      if (saveImage) {
        const link = document.createElement("a");
        link.download = `${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
        setImageSave(false);
      }

      if (savedCanvas) {
        const img = new Image();
        img.onload = () => {
          const raster = new paper.Raster(img);
          raster.position = paper.view.center;
          paper.project.activeLayer.addChild(raster);
        };
        img.src = savedCanvas;
      }
    };
    setCanvasSize();

    window.addEventListener("resize", setCanvasSize);

    let path;
    let startPoint;

    const drawRectangle = (point) => {
      ctx.putImageData(snapshot, 0, 0);
      const rect = new paper.Path.Rectangle({
        point: startPoint,
        size: new paper.Size(point.x - startPoint.x, point.y - startPoint.y),
        strokeColor: selected.color,
        strokeWidth: selected.size,
        fillColor: isFillSet ? selected.color : null,
      });
      paper.project.activeLayer.addChild(rect);
    };

    const drawCircle = (point) => {
      ctx.putImageData(snapshot, 0, 0);
      const radius = startPoint.subtract(point).length;
      const circle = new paper.Path.Circle({
        center: startPoint,
        radius: radius,
        strokeColor: selected.color,
        strokeWidth: selected.size,
        fillColor: isFillSet ? selected.color : null,
      });
      paper.project.activeLayer.addChild(circle);
    };

    const drawTriangle = (point) => {
      ctx.putImageData(snapshot, 0, 0);
      const triangle = new paper.Path.RegularPolygon({
        center: startPoint,
        sides: 3,
        radius: startPoint.subtract(point).length,
        strokeColor: selected.color,
        strokeWidth: selected.size,
        fillColor: isFillSet ? selected.color : null,
      });
      
      paper.project.activeLayer.addChild(triangle);
     
    };

    const drawing = (event) => {
      const point = new paper.Point(event.offsetX, event.offsetY);
      if (!isDrawing) return;

      setSnapShot(ctx.getImageData(0, 0, canvas.width, canvas.height));

      switch (selected.tool) {
        case "Brush":
          if (!path) {
            path = new paper.Path({
              strokeColor: selected.color,
              strokeWidth: selected.size,
            });
            paper.project.activeLayer.addChild(path);
          }
          path.add(point);
          break;
        case "Rectangle":
          setSnapShot(ctx.getImageData(0, 0, canvas.width, canvas.height));
          drawRectangle(point);
          break;
        case "Circle":
          setSnapShot(ctx.getImageData(0, 0, canvas.width, canvas.height));
          drawCircle(point);
          break;
        case "Triangle":
          setSnapShot(ctx.getImageData(0, 0, canvas.width, canvas.height));
          drawTriangle(point);
          break;
        case "Eraser":
          const eraserPath = new paper.Path({
            strokeColor: 'white',
            strokeWidth: selected.size * 4,
          });
          eraserPath.add(point);
          paper.project.activeLayer.addChild(eraserPath);
          break;
        default:
          break;
      }
    };

    const startDrawing = (event) => {
      isDrawing = true;
      startPoint = new paper.Point(event.offsetX, event.offsetY);

      setSnapShot(ctx.getImageData(0, 0, canvas.width, canvas.height));
      if (selected.tool === "Brush") {
        path = new paper.Path({
          strokeColor: selected.color,
          strokeWidth: selected.size,
        });
        paper.project.activeLayer.addChild(path);
      }

      setSnapShot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    };

    const endDrawing = () => {
      isDrawing = false;
      path = null;
      setSavedCanvas(canvas.toDataURL());
    };

    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", endDrawing);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      canvas.removeEventListener("mousemove", drawing);
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", endDrawing);
    };
  }, [savedCanvas, selected.tool, selected.size, selected.color, isFillSet, clearCanva, saveImage]);

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.imageData) {
      setSavedCanvas(location.state.imageData);
      location.state.imageData = null;
      location.state = null;
    }
  }, [location.state]);

  function setSelectedImageInvoker(imageData) {
    setSavedCanvas(imageData);
    imageData = null;
  }

  return (
    <Container fluid style={{ display: 'flex', padding: '20px', backgroundImage: `url(${img1})`, backgroundSize: 'cover', padding: '0px', margin: '8px 8px' }}>
      <ToolBar
        selected={selected}
        setSelected={setSelected}
        setFillProperty={() => setFill(!isFillSet)}
        isFillSet={isFillSet}
        setFill={setFill}
        clearCanva={clearingFunction}
        saveCanva={savingFunction}
        exportImage={exportImage}
      />
      <canvas ref={canvasRef} style={{ backgroundColor: 'white', marginRight: '40px', flex: 1, borderRadius: '10px' }}></canvas>
      <SavedDrawColumn onImageSelect={setSelectedImageInvoker} refresh={refresh} />
    </Container>
  );
};



export default ToolBarSelector;
