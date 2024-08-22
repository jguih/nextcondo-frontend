
param(
  [parameter()]
  [switch]$Puppeteer,
  [parameter()]
  [switch]$NoBuild
)

$StandaloneFolder = "$PSScriptRoot\..\.next\standalone"
$NextjsJobName = "NextjsServer"

function BuildNextjsApp {
  Invoke-Command -ScriptBlock {
    npx next build
  }
  $publicFolderPath = "$PSScriptRoot\..\public"
  $staticFolderPath = "$PSScriptRoot\..\.next\static"
  if (Test-Path $publicFolderPath -PathType Container) {
    Copy-Item -Path $publicFolderPath -Destination "$StandaloneFolder\public" -Force -Recurse
  }
  if (Test-Path $staticFolderPath -PathType Container) {
    Copy-Item -Path $staticFolderPath -Destination "$StandaloneFolder\.next\static" -Recurse -Force
  }
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
  if (-not $NoBuild) {
    BuildNextjsApp
  }
  StartNextjsServer
  RunPuppeteerTests
  StopNextjsSever
}