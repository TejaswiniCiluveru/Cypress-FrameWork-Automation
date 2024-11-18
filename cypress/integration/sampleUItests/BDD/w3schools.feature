Feature: End to End js tutorial
@Regression
Scenario: Study Tutorial
Given When I opened the url
When i login into the url
And i search Javasacript word in search
And Click on the start javascript tutorial.
And Navigate to different options present on the left side panel
Then Complete the course and verify

@smokeTest
Scenario Outline: Scenario Outline name: Study Tutorial with different username and password
| username                        | password
| Tejaswiniciluveru@outlook.com   | Teju@1108
Given When I opened the url
When i login into the url
And i search Javasacript word in search
And Click on the start javascript tutorial.
And Navigate to different options present on the left side panel
Then Complete the course and verify