
## node.js 
- node-version: [16.x]

## yarn 설치
```bash
npm i -g yarn
```
- yarn 패키지 메니저 전역설치

## 서버구동
- 모바일 :  `yarn mo`
- 데스크탑 : `yarn pc`
- 반응형 :  `yarn rp`

## 빌드
- 모바일 :  `yarn buildmo`
- 데스크탑 : `yarn buildpc`
- 반응형 : `yarn buildrp`

## 수동배포
- 모바일 : `yarn deploymo`
- 데스크탑 : `yarn deploypc`
- 반응형 : `yarn deployrp`

## 자동배포 (contains github.event.head_commit.message)
- `커밋메시지에 하단 문자열 포함시키면 자동배포됨!`
- 모바일 : `[ci/mo]`
- 데스크탑 : `[ci/pc]`
- 반응형 : `[ci/rp]`
- clean : `[ci/clean]`

## 확인경로
- mo: https://madive15.github.io/gulp-project-template/mo/
- pc: https://madive15.github.io/gulp-project-template/pc/
- rp: https://madive15.github.io/gulp-project-template/rp/


## ■ FILE STRUCTURE
```bash
  src               # 빌드 전 작업파일
  │   
  └───assets        # 리소스 파일 
    └───fonts       # 폰트파일
    └───images      # 이미지 파일 
    └───js          # 트렌스파일 할 js 파일
    └───json        # 제이슨 파일
    └───lib         # 트렌스파일 필요없는 라이브러리 js 
    └───sass        # scss 파일
  └───html          # html 파일
    └───include     # 인크루드용 파일
  
  ## 수정은 했으나 반영이 안되는경우는 빌드에러가 난것임
  dist              # 빌드되어진 전달및 뷰용 파일(로컬 서버는 이 폴더를 참조함)
  │   
  └───assets        # 리소스 파일 
    └───fonts       # src/fonts(파일 이동만함) 빌드 결과물이 들어감
    └───images      # src/images(파일 이동만함) 빌드 결과물이 들어감
    └───js          # src/js, src/lib(파일 이동만함), src/json(파일 이동만함) 빌드 결과물이 들어감
    └───css         # src/scss 파일에서 빌드된 결과 
  └───html          # src/html 파일

  .github           # github action 
```

## ■ WIKI

- 걸프설정: https://github.com/madive15/gulp-project-template/wiki
- 패키지들: https://github.com/madive15/gulp-project-template/wiki/packages