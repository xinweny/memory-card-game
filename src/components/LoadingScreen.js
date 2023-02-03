import React, { useState, useEffect } from 'react';

import '../styles/LoadingScreen.css';

function LoadingScreen(props) {
	const [loadMsg, setLoadMsg] = useState('Loading...');

	useEffect(() => {
		const timer = setInterval(() => {
			setLoadMsg(prevMsg => {
				const numDots = prevMsg.split('.').length - 1;

				return (numDots === 3) ? 'Loading' : prevMsg + '.';
			});
		}, 500);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="loading-screen">
			<div className="loading-bar">
				<p>{loadMsg}</p>
				<div className="bar">
					<div className="progress" style={{ width: `${props.progress}%` }}>
						<p>{Math.round(props.progress)}%</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoadingScreen;