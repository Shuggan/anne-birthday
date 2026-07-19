import DomeGallery from './DomeGallery.jsx';
import photoFiles from 'virtual:photos';
import './App.css';

const CREAM = '#f0e4d3';

const images = photoFiles.map(file => ({
  src: `${import.meta.env.BASE_URL}photos/${file}`,
  alt: 'A photo of Anne'
}));

export default function App() {
  return (
    <div className="page">
      <header className="headline">
        <h1>Happy Birthday Anne!</h1>
        <p>from Nana, Papa, Dermie, and The Singapore Duggans</p>
      </header>

      <div className="gallery" style={{ width: '100%', height: '100%' }}>
        {images.length === 0 ? (
          <div className="empty">Add photos to public/photos to fill the dome.</div>
        ) : (
          <DomeGallery
            images={images}
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={false}
            overlayBlurColor={CREAM}
            imageBorderRadius="20px"
            openedImageBorderRadius="16px"
            padFactor={0.03}
            openedImageWidth="100%"
            openedImageHeight="100%"
            autoRotate
            autoRotateSpeed={0.1}
          />
        )}
      </div>
    </div>
  );
}
