import React ,{ Component } from 'react';
import axios from '../../action/axios';
import jsPdf from 'jspdf';
import 'jspdf-autotable';

export default class noticeReport extends Component {

constructor(props){
  super(props);

  this.state ={
    posts:[]
  };
}

componentDidMount(){
  this.retrievePosts();
}

retrievePosts(){
  axios.get("/postsNotice").then(res =>{

  if(res.data.success){
    this.setState({
      posts:res.data.existingPosts
    });

    console.log(this.state.posts)
  }
  });

}

filterData(posts, searchKey){

    const result = posts.filter((post) => 
    
    post.noticeType.toLowerCase().includes(searchKey) ||
    post.noticeDate.toLowerCase().includes(searchKey) ||
    post.noticeTitle.toLowerCase().includes(searchKey) ||
    post.noticeBody.toLowerCase().includes(searchKey) 

  )
  this.setState({posts:result})
}


handleSearchArea = (e) =>{

  const searchKey = e.currentTarget.value;

  axios.get('/postsNotice').then(res =>{

    if(res.data.success){

      this.filterData(res.data.existingPosts, searchKey)

    }
  })
}

//Report pdf generation

jsPdfGenerator = () => {

    //New document in jspdf
    var doc = new jsPdf('l', 'pt', 'a3');

    doc.text(600, 20, 'Notices Report', { align: 'center' },);
    doc.autoTable({ html: '#notice-table' })

    doc.autoTable({
      columnStyles: { europe: { halign: 'center' } },
      margin: { top: 10 },
    })

    //save the pdf
    doc.save("Notices Report.pdf");
  }

  render(){

    return(

      <div className = "container">
        <div className = "row">
          <div className ="col-lg-9 mt-2 mb-2">
          <br></br> <center>
          <h4>All Notice Details</h4>
          </center>
          </div>
      <div className ="col-lg-9 mt-2 mb-2">
        <input
        className = "form-control"
        type = "search"
        placeholder = "search"
        name = "search"
        onChange = {this.handleSearchArea}>
        </input>
        </div>

   </div>
        <table Id = "notice-table" className = "table table-hover" style = {{marginTop:'40px', color:'#362419'}}>
          <thead>
           <tr>
              <th scope="col"><b>Notice ID</b></th>
              <th scope="col"><b>Notice Type</b></th>
              <th scope="col"><b>Notice Date</b></th>
              <th scope="col"><b>Notice Title</b></th>
              <th scope="col"><b>Notice Body</b></th>
             </tr>
          </thead>
            <tbody>
              {this.state.posts.map((posts,index) =>(
                <tr key={index}>
                  <th scope="row">{index+1}</th>

                <td>{posts.noticeType}</td>
                <td>{posts.noticeDate}</td>
                <td>{posts.noticeTitle}</td>
                <td>{posts.noticeBody}</td>
            </tr>
            ))}
          </tbody>
         </table>

         <button className="btn-primary" style={{ marginTop: '15px', backgroundColor: '#000080' }} onClick={this.jsPdfGenerator}><i className="fas fa-download"></i>&nbsp;Generate Report PDF</button>
          
        </div>
             
    )  
}
}

