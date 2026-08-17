import React from 'react'
import { Link } from 'react-router-dom';

const Forum = () => {
  return (
    <div className="forum-wrapper">
      {/* Top Card: Ask Question Form */}
      <div className="ask-question-card">
        <h2>Ask Question</h2>
        <form>
          <div className="form-group">
            <textarea
              name="question"
              rows="4"
              placeholder="please enter your question"
              required
            ></textarea>
          </div>
          <div className="btn-container">
            <button type="submit" className="add-btn">
              Add Question
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Section: Questions Table */}
      <div className="forum-table-wrapper">
        <table className="forum-table">
          <thead>
            <tr>
              <th style={{ width: '10%' }}>S No.</th>
              <th style={{ width: '50%' }}>Question</th>
              <th style={{ width: '20%' }}>Post Answer</th>
              <th style={{ width: '20%' }}>View Answer</th>
            </tr>
          </thead>
          <tbody>
            
              <tr>
                <td colSpan="4" className="no-data">
                  No questions found.
                </td>
              </tr>
            
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <button className="table-btn post-btn">Post</button>
                  </td>
                  <td>
                    <button className="table-btn view-btn">View</button>
                  </td>
                </tr>
              

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Forum;