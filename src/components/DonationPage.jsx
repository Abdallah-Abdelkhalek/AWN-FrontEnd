import DonationImg from './style/Donation.png'

import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { Spinner } from 'react-bootstrap'
import Post from './Post'
import { Container, Row, Col, InputGroup, FormControl, Form } from 'react-bootstrap'
import ReactPaginate from 'react-paginate';
import { Dropdown } from 'react-bootstrap'
import moment from 'moment'
import './style/post.css'
import {AllDonation} from '../Api/PostsApis'

function DonationPage() {
    const [posts, setposts] = useState({
        loading: true,
        error: '',
        postList: []
    })
    const [searchTitle, setSearchTitle] = useState('');
    const [start, setStart] = useState(0);
    const [selectedSort, setselectedSort] = useState('Default: Newly Added');
    const [SubCategory, setSubCategory] = useState('None')
    const url = (AllDonation)
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setposts({
                    loading: false,
                    postList: res.data,
                    error: ''
                })
            })
            .catch(err => {

                setposts({
                    loading: false,
                    postList: [],
                    error: err.message

                })
            })
    }, [])
    const convertToDay = (d) => {
        const day = moment(d.date, "YYYYMMDD").fromNow()
        const days = day[0];
        return (
            days
        )
    }
    const handleCheck = (e) => {
        setSubCategory(e.target.value)
    }
    var allPosts =
        posts.postList.filter(post => post.title.includes(searchTitle) || post.description.includes(searchTitle))
            .filter(post => {
                if (SubCategory === 'None') {
                    return true;
                }
                else
                    return SubCategory === post.subCategory
            })
            .filter(post => {
                if (post.status === 'active') {
                    return true;
                }
                else
                    return false;
            })
            .sort((a, b) => {
                if (selectedSort === 'Default: Newly Added') {
                    return true;
                }
                else if (selectedSort === 'Views: Low To High') {
                    return (a.numViews > b.numViews) ? 1 : -1
                }
                else if (selectedSort === 'Views: High To Low') {
                    return (a.numViews > b.numViews) ? -1 : 1
                }
                else if (selectedSort === 'Date: Oldest Added') {
                    return (convertToDay(a.date) < convertToDay(b.date)) ? 1 : -1
                }
                else return true;

            })
    var showedPosts = allPosts.slice(start * 30, (start * 30) + 30).map(poster => {
        return (
            <Col key={poster._id} md={6} lg={6} xl={4} sm={12} xs={12}>
                <Post post={poster} />
            </Col>
        )
    })

    return (
        <div>
            <Container style={{ width: "95%" }}>
                <div>
                    <Row style={{ alignItems: "center" }}>
                        <Col lg={{ span: 1 }}>
                            <img className="Dlogo" src={DonationImg} alt='Donation-logo' />
                        </Col>
                        <Col lg={{ span: 3 }} >
                            <p className="Plogo" >Donation</p>
                        </Col>
                        <Col lg={{ span: 4, offset: 2 }} style={{ marginTop: "40px" }}>
                            <InputGroup >
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Search</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl onChange={(e) => { setSearchTitle(e.target.value); setStart(0); }} placeholder={"Seach Title or Description"} />
                            </InputGroup>
                        </Col>
                        <Col lg={{ span: 1 }} style={{ marginTop: "40px" }}>
                            <Dropdown >
                                <Dropdown.Toggle style={{ backgroundColor: "#009899", border: "none" }} id="dropdown-basic">
                                    {selectedSort}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as="button" onSelect={() => { setselectedSort('Date: Oldest Added'); setStart(0); }}>Date: Oldest Added</Dropdown.Item>
                                    <Dropdown.Item as="button" onSelect={() => { setselectedSort('Date: Newly Added'); setStart(0); }}>Date: Newly Added</Dropdown.Item>
                                    <Dropdown.Item as="button" onSelect={() => { setselectedSort('Views: Low To High'); setStart(0); }}>Views: Low To High</Dropdown.Item>
                                    <Dropdown.Item as="button" onSelect={() => { setselectedSort('Views: High To Low'); setStart(0); }}> Views: High To Low</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </div>

            </Container>
            
            <Container className="subcatcont">
                <p className="subcat">Category</p>
                <hr />
                <Form>
                    <Form.Group as={Row}>
                        <Col sm={10}>
                            <Form.Check
                                defaultChecked
                                type="radio"
                                label="None"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios0"
                                value="None"
                                onChange={handleCheck}
                            />
                            <hr />
                            <Form.Check
                                style={{ fontWeight: "bold", color: "red" }}
                                type="radio"
                                label="Blood Plasma"
                                name="formHorizontalRadios"
                                id="formHorizontalRadiosplasma"
                                value="Blood Plasma"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Medical bills"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                value="Medical Bills"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Home Furniture"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                value="Home Furniture"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Sports"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                                value="Sports"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Clothes"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios4"
                                value="Clothes"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Kitchen"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios5"
                                value="Kitchen"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Electronics"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios6"
                                value="Electronics"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Tools"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios7"
                                value="Tools"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Toys"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios8"
                                value="Toys"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Home Applicances"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios9"
                                value="Home Applicances"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Jewelry"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios10"
                                value="Jewelry"
                                onChange={handleCheck}
                            />
                            <Form.Check
                                type="radio"
                                label="Books"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios11"
                                value="Books"
                                onChange={handleCheck}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Container>

            <Container className="contNL">
                <div>
                    {posts.loading &&
                        <Row className="justify-content-md-center" >
                            <Spinner style={{ marginTop: "100px", marginBottom: "400px" }} animation="grow" variant="success" />
                        </Row>}
                    {posts.error &&
                        <Row className="justify-content-md-center" style={{ marginTop: "100px", marginBottom: "400px" }}>
                            <h3 style={{ color: "red" }}>{posts.error}</h3>
                        </Row>}
                    {!posts.error && !posts.loading &&
                        <div>
                            <Row style={{ marginTop: "30px", marginLeft: "50px" }}>
                                {showedPosts}
                            </Row>
                            {allPosts.length > 30 &&
                            <Row className="paginateRow">
                                <ReactPaginate
                                    breakClassName={'page-item'} breakLinkClassName={'page-link'} containerClassName={'pagination'} pageClassName={'page-item'} pageLinkClassName={'page-link'} previousClassName={'page-item'} previousLinkClassName={'page-link'} nextClassName={'page-item'} nextLinkClassName={'page-link'} activeClassName={'active'}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={4}
                                    pageCount={allPosts.length / 30}
                                    onPageChange={(num) => {
                                        setStart(num.selected)
                                        window.scrollTo(0, 0)
                                    }}
                                    forcePage={start}
                                />
                            </Row> }
                        </div>}
                </div>
            </Container>
            
            
        </div>
    )
}

export default DonationPage
