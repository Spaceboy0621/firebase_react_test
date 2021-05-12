import { Button, Card, CardBody, Row, Col, Input } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'
import { Trash2 } from 'react-feather'
import classnames from 'classnames'
import { addExercise, getExercises, deleteExercise  } from '../../../redux/actions/auth'
import { toast, Slide } from 'react-toastify'
import Toast from './Toast'

import "../../../assets/myapp/css/star.css"
import "./test.css"

const Training = () => {
  const dispatch = useDispatch()
  const { register, errors, handleSubmit, trigger } = useForm()

  const [items, setItems] = useState([])
  const [category, setCategory] = useState('')
  const [exerciseName, setExerciseName] = useState('')
  const [load, setLoad] = useState(0)
  const [reps, setReps] = useState(0)
  const [rpe, setRpe] = useState(0)
  
  useEffect(() => {
    dispatch(getExercises())
  }, [])

  const exercises = useSelector(state => state.auth.exercises)

  const handleAddExercise = () => {
    if (!category) {
      toast.error(
        <Toast type={'error'} name={'Input the cateogry'} msg={''} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 } 
        )
      return
    }

    if (!exerciseName) {
      toast.error(
        <Toast type={'error'} name={'Input the exerciseName'} msg={''} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 } 
        )
      return
    }

    if (load < 0) {
      toast.error(
        <Toast type={'error'} name={'Load must be positive number'} msg={''} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 } 
        )
      return
    }

    if (reps < 0) {
      toast.error(
        <Toast type={'error'} name={'Reps must be positive number'} msg={''} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 } 
        )
      return
    }

    if (rpe < 0) {
      toast.error(
        <Toast type={'error'} name={'Rpe must be positive number'} msg={''} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 } 
        )
      return
    }

    const document = {
      category,
      exerciseName,
      sets: {
        load,
        reps,
        rpe
      }
    }
    dispatch(addExercise(document))
  }

  const handleDeleteExercise = (id) => {
    dispatch(deleteExercise(id))
  }
  return (
    <div>
      <div className="starsContainer">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
      </div>
      <div className="mainboard">
      <Card>
        <CardBody>
          <Row>
            <Col md={12}>
              <h2>Exercise</h2>
            </Col>
            <Col md={12}>
              <Row className="bottomeLine text-white">
                <Col md={3}>Category</Col>
                <Col md={3}>Exercise</Col>
                <Col md={2}>LOAD</Col>
                <Col md={2}>REPS</Col>
                <Col md={2}>RPE</Col>
              </Row>
              {exercises.map((item, index) => (
                <Row className="bottomeLine mt-50" key={index}>
                  <Col md={3}>{item.category}</Col>
                  <Col md={3}>{item.exerciseName}</Col>
                  <Col md={2}>{item.sets.load}</Col>
                  <Col md={2}>{item.sets.reps}</Col>
                  <Col md={2} className="text-right">
                    {item.sets.rpe}
                    <span className="marginLeft50">
                      <Trash2 onClick={() => handleDeleteExercise(item.id)} className="marginTop20minus" size={20}/>
                    </span>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col md={12}>
            <Row className="mt-50">
                <Col md={3}>
                  <Input
                    type='text'
                    value={category}
                    id='category'
                    name='category'
                    onChange={e => setCategory(e.target.value)}
                    className={classnames({ 'is-invalid': errors['category'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                    />
                </Col>
                <Col md={3}>
                  <Input
                    type='text'
                    value={exerciseName}
                    id='exerciseName'
                    name='exerciseName'
                    onChange={e => setExerciseName(e.target.value)}
                    className={classnames({ 'is-invalid': errors['exerciseName'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                    />
                </Col>
                <Col md={2}>
                  <Input
                    type='number'
                    value={load}
                    id='load'
                    name='load'
                    onChange={e => setLoad(e.target.value)}
                    className={classnames({ 'is-invalid': errors['load'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                    />
                </Col>
                <Col md={2}>
                  <Input
                    type='number'
                    value={reps}
                    id='reps'
                    name='reps'
                    onChange={e => setReps(e.target.value)}
                    className={classnames({ 'is-invalid': errors['reps'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                    />
                </Col>
                <Col md={2}>
                  <Input
                    type='number'
                    value={rpe}
                    id='rpe'
                    name='rpe'
                    onChange={e => setRpe(e.target.value)}
                    className={classnames({ 'is-invalid': errors['rpe'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                    />
                </Col>
              </Row>
            </Col>
            <Col md={{ size: 6, offset: 6 }} className="text-right mt-50">
              <Button color='info' className="btn-circle" onClick={handleAddExercise}>Submit</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      </div>
      
    </div>
  )
}

export default Training
