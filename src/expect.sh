#!/usr/bin/expect
set timeout 60

spawn ssh -N -R [lindex $argv 0]:[lindex $argv 1]:localhost:[lindex $argv 2] [lindex $argv 3]@[lindex $argv 0]

expect "yes/no" {
    send "yes\r"
    expect "*?assword" { send "[lindex $argv 4]\r" }
    } "*?assword" { send "[lindex $argv 4]\r" }

interact