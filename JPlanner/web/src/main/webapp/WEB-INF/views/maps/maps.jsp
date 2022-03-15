<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
	<html>

	<head>
		<meta charset="EUC-KR">
		<title>map test</title>
		<script type="text/javascript"
			src="//dapi.kakao.com/v2/maps/sdk.js?appkey=879223fdb605bce94d0094de10b34048&libraries=services"></script>
		<script src="https://code.jquery.com/jquery-latest.min.js"></script>
		<script src="/js/jquery-3.6.0.min.js"></script>
		<script type="text/javascript" src="/js/maps/kakao.js"></script>
    <link href="/css/maps/maps.css" rel="stylesheet" type="text/css">
	</head>

	<body>
		<div id="container">

			<main>
				<div id="search-bar">
					<div id="input-keyword">
						<input type="text" id="searcher" placeholder="목적지를 입력해 주세요" onkeypress="searchKeyword()">
						<ul id="searched-places"></ul>
					</div>
					<button type="button" id="search-btn">
						<span>검색</span>
					</button>
				</div>
				<div id="maps" style="width: 800px; height: 800px;">


				</div>

			</main>
			
			<aside>
				<div id="scheduler">
					<div id="schedule-header">
						<span>Tour Schedule</span>
					</div>
					
				</div>
				<div class="wayToSort">
					<span>경로 탐색 우선순위</span>
					<label for="RECOMMEND">
						<input type="radio" id="RECOMMEND" name="priority" value="RECOMMEND" checked>  추천 경로
					</label>
					<label for="TIME">
						<input type="radio" id="TIME" name="priority" value="TIME">  최단 시간
					</label>
					<label for="DISTANCE">
						<input type="radio" id="DISTANCE" name="priority" value="DISTANCE">  최단 경로
					</label>
				</div>
				<div class="scheduler-btns">
					<div class="saveBtn">
						<span>저장</span>
					</div>
					<div class="clearBtn">
						<span>초기화</span>
					</div>
				</div>
			</aside>
<!-- ctrl + d 한줄 삭제
	 ctrl + shift + 좌우 블럭
	 alt + 위아래 방향키 = 줄이동 -->
		</div>
		
		<script src="/js/maps/maps.js"></script>
	</body>

	</html>