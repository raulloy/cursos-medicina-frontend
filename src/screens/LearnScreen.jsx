import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function LearnScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { viewedCourse, userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/learn');
    }
  }, [userInfo, navigate]);

  // const defaultSelectedVideoLink = viewedCourse ? viewedCourse.videoLinks[0] : '';
  const [selectedVideoLink, setSelectedVideoLink] = useState(
    viewedCourse.videoLinks[0].video
  );

  return (
    <div>
      <Helmet>
        <title>Learning</title>
      </Helmet>
      <h2>{viewedCourse.name}</h2>
      <Row>
        <Col md={4}>
          {viewedCourse ? (
            <ListGroup>
              <ListGroup.Item>
                <Row className="align-items-center">
                  {/* <Col md={8}>{viewedCourse.name}</Col> */}
                  <Col md={12}>
                    {viewedCourse.videoLinks.map((link, index) => (
                      <Link
                        to="#"
                        onClick={() => setSelectedVideoLink(link.video)}
                        key={index}
                        style={{
                          fontWeight:
                            selectedVideoLink === link.video
                              ? 'bold'
                              : 'normal',
                        }}
                        className="text-decoration-none d-block mb-2"
                      >
                        {`${index + 1}. ${link.name}`}
                      </Link>
                    ))}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          ) : (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          )}
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>
                    {
                      viewedCourse.videoLinks.find(
                        (link) => link.video === selectedVideoLink
                      )?.name
                    }
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>
                    <iframe
                      width="100%"
                      height="400"
                      src={getEmbeddedVideoLink(selectedVideoLink)}
                      title={`Selected Video`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button type="button" variant="primary">
                      Finish
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function getEmbeddedVideoLink(videoLink) {
  // Extract the video ID from the YouTube URL
  const videoId = videoLink.split('?v=')[1].split('&')[0];

  // Return the embedded YouTube video link
  return `https://www.youtube.com/embed/${videoId}`;
}

{
  /* <iframe
  width="100%"
  height="400"
  src={selectedVideoLink}
  title={`Selected Video`}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>; */
}
