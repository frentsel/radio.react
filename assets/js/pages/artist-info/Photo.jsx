import React from 'react';
import meta from '../../libs/meta';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

const Photo = React.createClass({

	getInitialState() {
		return {
			photos: null,
			pageNum: 1,
			totalPages: 1,
			loadedAll: false,
			currentImage: 0,
			images: []
		}
	},

	componentWillMount() {

		meta.getArtistImages(this.props.params.artistName, (images) => {
			this.setState({
				images: images
			});
		});
	},

	setDefaultImage(e) {
		e.target.src = "/img/placeholder-image.png";
	},

	openLightbox(index, event){
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true
		});
	},

	closeLightbox(){
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	},

	gotoPrevious(){
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	},

	gotoNext(){
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	},

	render(){

		if (!this.state.images.length)
			return <div className="loader"></div>;

		console.info("images: ", this.state.images);

		const images = this.state.images.reduce((res, src) => {
			res.push({
				src: src,
				width: 170,
				height: 170,
				srcset: [
					src+' 300w, '+src.replace('/avatar170s/', '/avatar800s/')+' 1600w'
				],
			});
			return res;
		}, []);

		return (
			<div className="photo-list">
				<Gallery photos={images} cols={4} onClickPhoto={this.openLightbox} />
				<Lightbox
					images={images}
					backdropClosesModal={true}
					onClose={this.closeLightbox}
					onClickPrev={this.gotoPrevious}
					onClickNext={this.gotoNext}
					currentImage={this.state.currentImage}
					isOpen={this.state.lightboxIsOpen}
					width={1400}
				/>
			</div>
		);
	}
});

export default Photo;