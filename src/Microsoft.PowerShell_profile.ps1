$docker_host_ip = wsl -d Ubuntu -- ip -o -4 -json addr list eth0 `
| ConvertFrom-Json `
| %{ $_.addr_info.local } `
| ?{ $_ }
 
$s = "tcp://" + $docker_host_ip + ":2375"
Write-Host "variable DOCKER_HOST is set to" $s
 
$Env:DOCKER_HOST=$s