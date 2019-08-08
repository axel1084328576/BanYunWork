
const rolesData=[];
for(let i=0;i<10;i+=1){
	rolesData.push({
		key: `${i}n`,
		name:`角色${i}`,
		comments:`comments${i}`,
	})
}

export default {
  'GET /api/roleManage/getRoles': rolesData,
};
