import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './home';

import Graphical from './components/roe/graphical';
import Bisection from './components/roe/bisection';
import Falseposition from './components/roe/falseposition';
import Onepoint from './components/roe/onepoint';
import Newtonraphson from './components/roe/newtonraphson';
import Secant from './components/roe/secant';

import Cramer from './components/la/cramer';
import GaussEli from './components/la/gausseli';
import GaussJordan from './components/la/gaussjordan';
import MatrixInverse from './components/la/matrixinverse';
import LU from './components/la/lu';
import Cholesky from './components/la/cholesky';
import Jacobi from './components/la/jacobi';
import GaussSeidel from './components/la/gaussseidel';

import LinearInter from './components/inter/linearInterpolation';
import QuardraticInter from './components/inter/quardraticinterpolation';
import PolyInter from './components/inter/polynamialinterpolation';
import LinearLagrange from './components/inter/linearlagrange';
import QuardraticLagrange from './components/inter/quardraticlagrange';
import PolyLagrange from './components/inter/polynomaillagrange';

import LinearSpline from './components/spline/linearSpline';
import QuardraticSpline from './components/spline/quardraticSpline';
import CubicSpline from './components/spline/cubicSpline';

import LinearRegression from './components/regression/linearRegression';
import PolyRegression from './components/regression/polynomialRegression';
import MultipleRegression from './components/regression/multipleRegression';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='' element={<Home/>} />  
        <Route path='/graphical' element={<Graphical/>} />
        <Route path='/bisection' element={<Bisection/>} />
        <Route path='/falseposition' element={<Falseposition/>} />
        <Route path='/onepoint' element={<Onepoint/>} />
        <Route path='/newtonraphson' element={<Newtonraphson/>} />
        <Route path='/secant' element={<Secant/>} />

        <Route path='/cramer' element={<Cramer/>} />
        <Route path='/gausseli' element={<GaussEli/>} />
        <Route path='/gaussjor' element={<GaussJordan/>} />
        <Route path='/matrixinverse' element={<MatrixInverse/>} />
        <Route path='/lu' element={<LU/>} />
        <Route path='/cholesky' element={<Cholesky/>} />
        <Route path='/jacobi' element={<Jacobi/>} />
        <Route path='/gausssei' element={<GaussSeidel/>} />

        <Route path='/linearinterpolation' element={<LinearInter/>} />
        <Route path='/quardraticinterpolation' element={<QuardraticInter/>} />
        <Route path='/polynomialinterpolation' element={<PolyInter/>} />
        <Route path='/linearlagrange' element={<LinearLagrange/>} />
        <Route path='/quardraticlagrange' element={<QuardraticLagrange/>} />
        <Route path='/polynomiallagrange' element={<PolyLagrange/>} />

        <Route path='/linearSpline' element={<LinearSpline/>} />
        <Route path='/quardraticSpline' element={<QuardraticSpline/>} />
        <Route path='/cubicSpline' element={<CubicSpline/>} />

        <Route path='/linearRegression' element={<LinearRegression/>} />
        <Route path='/polynomialRegression' element={<PolyRegression/>} />
        <Route path='/multipleRegression' element={<MultipleRegression/>} />

      </Routes>
    </Router>
  );
}

export default App;