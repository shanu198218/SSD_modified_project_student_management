import React ,{ Component } from 'react';
import axios from '../../action/axios';
import jsPdf from 'jspdf';
import 'jspdf-autotable';

export default class classDetailsReport extends Component {

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
  axios.get("/postsClass").then(res =>{

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
    
    post.subjectName.toLowerCase().includes(searchKey) ||
    post.subjectCode.toLowerCase().includes(searchKey) ||
    post.teacherName.toLowerCase().includes(searchKey) ||
    post.classType.toLowerCase().includes(searchKey) ||
    post.hallNo.toLowerCase().includes(searchKey) ||
    post.startDate.toLowerCase().includes(searchKey) ||
    post.time.toLowerCase().includes(searchKey)

  )
  this.setState({posts:result})
}


handleSearchArea = (e) =>{

  const searchKey = e.currentTarget.value;

  axios.get('/postsClass').then(res =>{

    if(res.data.success){

      this.filterData(res.data.existingPosts, searchKey)

    }
  })
}

//Report pdf generation

jsPdfGenerator = () => {

    //New document in jspdf
    var doc = new jsPdf('l', 'pt', 'a3');

    doc.text(600, 20, 'Class Details Report', { align: 'center' },);
    doc.autoTable({ html: '#class-table' })

    doc.autoTable({
      columnStyles: { europe: { halign: 'center' } },
      margin: { top: 10 },
    })

    //save the pdf
    doc.save("Class Details.pdf");
  }

  render(){

    return(

      <div className = "container">
        <div className = "row">
          <div className ="col-lg-9 mt-2 mb-2">
          <br></br> <center>
          <h4>All Class Details</h4>
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
        <table Id = "class-table" className = "table table-hover" style = {{marginTop:'40px', color:'#362419'}}>
          <thead>
           <tr>
              <th scope="col"><b>Class ID</b></th>
              <th scope="col"><b>Subject Name</b></th>
              <th scope="col"><b>Subject Code</b></th>
              <th scope="col"><b>Grade</b></th>
              <th scope="col"><b>Teacher's Name</b></th>
              <th scope="col"><b>Class Type</b></th>
              <th scope="col"><b>Hall No.</b></th>
              <th scope="col"><b>Start Date</b></th>
              <th scope="col"><b>Time</b></th>

             </tr>
          </thead>
            <tbody>
              {this.state.posts.map((posts,index) =>(
                <tr key={index}>
                  <th scope="row">{index+1}</th>

                <td>{posts.subjectName}</td>
                <td>{posts.subjectCode}</td>
                <td>{posts.grade}</td>
                <td>{posts.teacherName}</td>
                <td>{posts.classType}</td>
                <td>{posts.hallNo}</td>
                <td>{posts.startDate}</td>
                <td>{posts.time}</td>

            </tr>
            ))}
          </tbody>
         </table>

         <button className="btn-primary" style={{ marginTop: '15px', backgroundColor: '#000080' }} onClick={this.jsPdfGenerator}><i className="fas fa-download"></i>&nbsp;Generate Report PDF</button>
          
        </div>
             
    )  
}
}

