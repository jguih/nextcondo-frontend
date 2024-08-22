
param(
  [parameter()]
  [switch]$Puppeteer
)

$StandaloneFolder = "$PSScriptRoot\..\.next\standalone"
$NextjsJobName = "NextjsServer"

function BuildNextjsApp {
  Invoke-Command -ScriptBlock {
    npx next build
  }
  Copy-Item -Path "$PSScriptRoot\..\public" -Destination "$StandaloneFolder\public" -Force -Recurse
  Copy-Item -Path "$PSScriptRoot\..\.next\static" -Destination "$StandaloneFolder\.next\static" -Recurse -Force
}

function StartNextjsServer {
  $scriptBlock = {
    param (
      $path, 
      $param2
    )
    node "$path\server.js"
  }

  Start-Job -ScriptBlock $scriptBlock -ArgumentList $StandaloneFolder -Name $NextjsJobName
}

function StopNextjsSever {
  Stop-Job -Name $NextjsJobName
  Remove-Job -Name $NextjsJobName
}

function RunPuppeteerTests {
  Invoke-Command -ScriptBlock {
    npx jest --verbose --testPathPattern=__tests__/integration
  }
}

function DeleteStandaloneFolder {
  if (Test-Path $StandaloneFolder -PathType Container) {
    Remove-Item -Path $StandaloneFolder -Force -Recurse
  }
}

# Runs unit tests first
Invoke-Command -ScriptBlock {
  npx jest --verbose --testPathPattern=__tests__/unit
}

# Setup Nextjs server and run tests that use puppeteer
if ($Puppeteer) {
  BuildNextjsApp
  StartNextjsServer
  RunPuppeteerTests
  StopNextjsSever
  DeleteStandaloneFolder
}