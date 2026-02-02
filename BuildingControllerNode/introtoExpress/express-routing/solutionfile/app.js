const express = require('express');
const app = express();
const ExpressError = require('./expressError');

const { convertAndValidateNumsArray, findMode, findMean, findMedian, saveResultToFile } = require('./helpers');

app.get('/mean', async function(req, res, next) {
  try {
    if (!req.query.nums) {
      throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message, 400);
    }


    let result = {
      operation: "mean",
      result: findMean(nums)
    }

    if (req.query.save === 'true') {
      try {
        await saveResultToFile({...result, timestamp: new Date().toISOString()});
      } catch (err) {
        console.error('Error saving results:', err);
      }
    }

    if (req.accepts('application/json')) {
      return res.json(result);
    } else if (req.accepts('text/html')) {
      return res.type('html').send(`<p>${result.operation}: ${result.result}</p>`);
    }

    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

app.get('/median', async function(req, res, next) {
  try {
    if (!req.query.nums) {
      throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message, 400);
    }

    let result = {
      operation: "median",
      result: findMedian(nums)
    }

    if (req.query.save === 'true') {
      try {
        await saveResultToFile({...result, timestamp: new Date().toISOString()});
      } catch (err) {
        console.error('Error saving results:', err);
      }
    }

    if (req.accepts('application/json')) {
      return res.json(result);
    } else if (req.accepts('text/html')) {
      return res.type('html').send(`<p>${result.operation}: ${result.result}</p>`);
    }

    return res.json(result);
    
  } catch (err) {
    return next(err);
  }
});

app.get('/mode', async function(req, res, next) {
  try {
    if (!req.query.nums) {
      throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message, 400);
    }

    let result = {
      operation: "mode",
      result: findMode(nums)
    }

    if (req.query.save === 'true') {
      try {
        await saveResultToFile({...result, timestamp: new Date().toISOString()});
      } catch (err) {
        console.error('Error saving results:', err);
      }
    }

    // honor Accept header
    if (req.accepts('application/json')) {
      return res.json(result);
    } else if (req.accepts('text/html')) {
      return res.type('html').send(`<p>${result.operation}: ${result.result}</p>`);
    }

    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

app.get('/all', async function(req, res, next) {
  try {
    if (!req.query.nums) {
      throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message, 400);
    }

    let result = {
      operation: "all",
      mean: findMean(nums),
      median: findMedian(nums),
      mode: findMode(nums)
    }

    if (req.query.save === 'true') {
      try {
        await saveResultToFile({...result, timestamp: new Date().toISOString()});
      } catch (err) {
        console.error('Error saving results:', err);
      }
    }

    if (req.accepts('application/json')) {
      return res.json(result);
    } else if (req.accepts('text/html')) {
      let html = `<h1>Results</h1><ul>`;
      for (let k in result) {
        if (k !== 'operation') html += `<li>${k}: ${result[k]}</li>`;
      }
      html += `</ul>`;
      return res.type('html').send(html);
    }

    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

/** general error handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found",404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;
