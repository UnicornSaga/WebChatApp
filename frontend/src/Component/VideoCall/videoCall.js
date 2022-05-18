import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from 'socket.io-client';
import "./videoCall.scss";
//import leaveCallIcon from "../../Assets/leaveCall.png";
import leaveCallIcon from "../../Assets/logout.png";

const VideoCall = ({ email, destination }) => {
	// const [ socket, setSocket ] = useState(inputSocket);
    const [ me, setMe ] = useState(email)
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(true)
	const [ name, setName ] = useState("")
	const [count, setCount] = useState(0);

	const myVideo = useRef()
	const userVideo = useRef()
	const socket = useRef();
	const connectionRef = useRef();

	useEffect(() => {
		if (!callEnded) return;
		socket.current = io(`http://${window.location.hostname}:5000`, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: 99999
		});

		/* socket.current.on("me", (data) => {
			setMe(data);
		}) */
		socket.current.emit("identity", { identity: me })
	}, [callEnded])

	useEffect(() => {
		initVideo();

		socket.current.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)
			console.log("Caller: " + data.from);
			setName(data.name)
			setCallerSignal(data.signal)
		})

		socket.current.on("callEnded", () => {
			connectionRef.current.destroy();
			resetAppState();
		})
	}, [])

	const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.current.emit("callUser", {
				userToCall: destination,
				signalData: data,
				from: me,
				name: me
			})
		})
		peer.on("stream", (stream) => {
				userVideo.current.srcObject = stream
		})
		socket.current.on("callAccepted", (signal) => {
			setCallAccepted(true)
			setCallEnded(false);
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall = () =>  {
		setCallAccepted(true)
		setCallEnded(false);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.current.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		connectionRef.current.destroy();
		socket.current.emit('callEnded');
		resetAppState();
	}

	const initVideo = () => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
			myVideo.current.srcObject = stream
		})
	}

	const resetAppState = () => {
		setCallEnded(true)
		setCallAccepted(false);
		setCount(count + 1);
		setReceivingCall(false);
		initVideo();
	}

	return (
		<div className="container">
			<div className="video-container">
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "550px"}} />:
					null}

						<div className="video">
							{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "550px" }} />}
						</div>

				</div>
			</div>

			<div className="myId">
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<Button variant="contained" color='red' onClick={leaveCall}>
							<img src ={leaveCallIcon} height = "50" width= "50" />
						</Button>
					) : (
						<IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
							<PhoneIcon fontSize="large" />
						</IconButton>
					)}
					{idToCall}
				</div>
			</div>

			<div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >{name} is calling...</h1>
						<Button variant="contained" color="primary" onClick={answerCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>
		</div>
	)
}

export default VideoCall;