import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default class App extends React.Component {
 //other logic
   render() {
	return(
	 <Loader
		type="ThreeDots"
		color="#00BFFF"
		height={100}
		width={100}
		visible={this.props.loading}
	 />
	);
   }
}