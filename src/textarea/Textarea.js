import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { EditorState , convertToRaw  , ContentState , convertFromHTML} from 'draft-js';
import "./texteditor.css";

class Textarea extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value : this.initValue() , toolbarClassName : "hide"};
		this.handleChange = this.handleChange.bind(this) ;
		this.sendData = this.sendData.bind(this);
		this.focus = this.focus.bind(this);
	}

	initValue() {
		 let val = convertFromHTML('<h1>vaNakkam chennai</h1>') ;
		 return EditorState.createWithContent(
		  ContentState.createFromBlockArray(val)
		)
	}

	componentDidMount(){
		this.sendData() ;
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.note && nextProps.note.note){	
			let val = convertFromHTML(draftToHtml(nextProps.note.note));
			let content = EditorState.createWithContent(ContentState.createFromBlockArray(val));
			this.setState({value : content})
			return true ;
		}else{
			return false ;
		}
	}

	handleChange(editorState){
		this.setState({value : editorState} , this.sendData()) ;
	}
	
	focus (ev){
		//this.setState({toolbarClassName : "show"}) ;
		//ev.preventDefault();
	}

	blur(){
		//this.setState({toolbarClassName : "show"}) ;
	}

	sendData(){
		let val = convertToRaw(this.state.value.getCurrentContent()) ;
		this.props.sendNote(val);
	}


	render(){
		return(
			<div onBlur={this.sendData} className="text-editor">
				<Editor
					editorState={this.state.value}
					toolbarClassName={this.state.toolbarClassName}
					wrapperClassName="wrapperClassName"
					editorClassName="editorClassName"
					onEditorStateChange={this.handleChange}
					placeholder="Content"
					onBlur={this.blur}
					onFocus={this.focus}
				/>
			</div>
		)
	}

}


export default Textarea ;
