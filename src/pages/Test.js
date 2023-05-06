import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEdit } from '../redux/modules/componentMode';
import Answer from '../components/Answer';
import styled from "styled-components";

function Test() {
    
    // 전역 스토어에서 현재 게시글이 수정상태인지 여부를 가져온다.
    const isEditMode = useSelector((state) => {
        return state.componentMode.IsEdit
    })

    // 액션객체를 시행하기 위핸 디스패쳐를 선언한다.
    const dispatcher = useDispatch()

    // 디스패쳐를 통해 import한 isEdit에 값을 넘겨준다.
    // true, false를 명시적으로 넘겨줌. 수정모드 하고시으면 이걸 트루로 버튼에서 바꿔준다.
    dispatcher(isEdit(false))

    return (
        <Main>
            TEST
            <Answer>
            </Answer>
        </Main>
    );
}

export const Main = styled.main`
    padding-top: 160px;
    min-height: calc(100vh - 160px); // 헤더와 네비 높이만큼 제외
    background-color: #f1f3f5;
`

export default Test;

