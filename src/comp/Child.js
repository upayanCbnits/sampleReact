import React from 'react';
import './Appx/Appx.css';
import Api from "../Services/Api";
import Loader from "react-loader-spinner";
const baseUrl1 = "https://archive.org/advancedsearch.php?q=subject:google+sheets&output=json"
class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resp1: [] ,
            pageArr: [] ,
            array: [] ,
            array1: [] ,
            activePage: '' ,
            loader: false
        }
        this.pageSplit = this.pageSplit.bind(this);
        this.arraySplit = this.arraySplit.bind(this);
    }
    componentDidMount() {
        this.setState({
            loader: true
        });
        Api.get(baseUrl1).then((res1) => {
            console.log("resp1", res1.response.docs)
            this.setState({
                resp1: res1.response.docs ,
                loader: false
            });
            this.pageSplit();
            this.arraySplit(0);
        }).catch((error) => {
            console.log(error);
            this.setState({
                loader: false
            });
        });
      }
      pageSplit(){
          let length = this.state.resp1.length;
          let arr = [];
          let pageNo = 0;
          let arr1 = [];
          if(length%10 === 0){
              pageNo = length/10;
          }
          else{
              pageNo = Math.floor(length/10)
          }
          for (let index = pageNo; index > 0; index--) {
              arr.splice(0,0,index);
              arr1.splice(0,0,(index-1)*10)
          }
          this.setState({
            pageArr: arr,
            array1: arr1
        });
      }
      arraySplit(i){
          let arr = [];
          let index;
          for (index = this.state.array1[i]; index < this.state.array1[i]+10; index++) {
              arr[index] = this.state.resp1[index];
          }
          this.setState({
            array: arr ,
            activePage: i
        });

      }
    render() {
        return (
            <div>
            {this.state.loader ? <Loader type="Circles" color="#00BFFF" height={40} width={40}/> :
            <div>
                <div className="table">
                    {this.state.array.length>0 ? 
                    <div>
                    <table>
                        <tr>
                            <th>Title</th>
                            <th>Week</th>
                            <th>Score</th>
                        </tr>
                        {this.state.array.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.title}</td>
                                    <td>{item.week}</td>
                                    <td>{item._score}</td>
                                </tr>
                            );
                        })}
                    </table></div>: <div></div>}
                </div>
                <div className="pagination">
                    {this.state.pageArr.length>0 ? 
                    <div>
                        <a href="#" className={this.state.activePage===0 ? "no-drop" : ""}
                        onClick={this.state.activePage===0 ? this.arraySplit.bind(this, this.state.activePage): this.arraySplit.bind(this, this.state.activePage-1)}>&raquo;</a>
                        {this.state.pageArr.map((item, i) => {
                            return (
                                <a className={this.state.activePage === i ? "active" : ""}
                                    href="#" onClick={this.arraySplit.bind(this, i)} key={i}>{item}</a>
                            );
                        })}
                        <a href="#" className={this.state.activePage===this.state.pageArr.length-1 ? "no-drop" : ""}
                        onClick={this.state.activePage===this.state.pageArr.length-1 ? this.arraySplit.bind(this, this.state.activePage): this.arraySplit.bind(this, this.state.activePage+1)}>&raquo;</a> 
                    </div> : <div></div>}
                </div>
            </div> }
            </div>
        );
    }
}
export default Child;

