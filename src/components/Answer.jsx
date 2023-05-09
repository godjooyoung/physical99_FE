import React, { useEffect, useState } from "react";
import { useMutation } from "react-query"; // 서버요청, 쿼리 키 값으로 관리
import { useParams } from "react-router-dom"; // 패치의 파람
import { useDispatch } from "react-redux"; //리듀서 실행
import { quizSolving } from "../api/quiz";
import { useRef } from "react";
import styled from "styled-components";
import * as CSS from "../style/commonStyle"

function Answer(props) {

  const params = useParams();
  // 내부상태
  const [answerArr, setAnswerArr] = useState();
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (props.data) {
      setAnswerArr(props.data.data.data.answerList);
      console.log(props.data.data.data.answerList);
    }
  }, [props.data]);

  const answerInput = useRef();

  const onChangeEventHandler = (e) => {
    setAnswer(e.target.value);
    console.log("제출한 정답은 " + answer + " 입니다.");
  };

  // div 클릭 이벤트
  const onClickEventHandler = (e) => {
    const chooseAnswer = e.target.innerText;
    submitAnswer(chooseAnswer);
  };

  const submitAnswer = (finalAnswer) => {
    console.log("정답을 제출합니다.");
    console.log("최종 제출 답안 : " + finalAnswer);
    if (finalAnswer.trim().length === 0) {
      alert("정답을 입력해주세요.");
      answerInput.current.focus();
      return;
    } else {
      alert("정답을 제출합니다. 과연 맞출수 있을까요?!");
      quizSolvingMutateCall(finalAnswer)
      setAnswer("");
    }
  };

  const quizSolvingMutate = useMutation(quizSolving, {
    onSuccess: () => {
      console.log("답안제출 성공")
      // TODO 새로 리로딩 및 제출 값에 따라서 성공/실패 화면에 리턴해주기
    },
    onError: () => {
      console.log("답안제출통신에러")
    }
  })

  const quizSolvingMutateCall = (finalAnswer) => {
    console.log(":::: 퀴즈 답안제출 최종 전달값, ", { quizId: params.id, correct: finalAnswer })
    quizSolvingMutate.mutate({ quizId: params.id, correct: finalAnswer })
  }

  return (
    <>
      {
        props.isEdit ? (
          <div>수정중 게시글</div>
        ):(
          (answerArr && answerArr.length > 1) ?
          (
              <CSS.AnswerInputWrapDiv>
                <CSS.AnswerDiv per="14">
                  <CSS.TitleInputWrapDiv>
                    <CSS.TitleInput ref={answerInput} onChange={onChangeEventHandler} type="text" value={answer}></CSS.TitleInput>
                  </CSS.TitleInputWrapDiv>
                </CSS.AnswerDiv>
                <CSS.AnswerDiv per="1">
                  <button onClick={() => submitAnswer(answer)}>제출</button>
                </CSS.AnswerDiv>
            </CSS.AnswerInputWrapDiv>
            )
           :(
            <div className="answerContainer" style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              {answerArr && answerArr.map((answer) => {
                return (
                  <div onClick={onClickEventHandler} style={{ flex: 1, background: "green",height: `calc(100vh - 90vh)`,}}>
                    {answer}
                  </div>
                  );
                })}
            </div>
           ) 
        )
      }
    </>
    )
  }



export default Answer;
