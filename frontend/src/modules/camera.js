
function Camera(props) {
  if (!props.data) {
    return null;
  }
  // const [image, setImage] = useState(null);

  // useEffect(() => {
  //   socket.on("CameraFeed", setImage);

  //   socket.on("Comm", console.log);
  //   return () => socket.disconnect();
  // }, []);
  // const image = null;

  return (
    <div>
      <h1>Websocket test</h1>
      {props.data.image && <img src={`data:image/jpg;base64,${props.data.image}`} />}
    </div>
  );
}

export default Camera;
