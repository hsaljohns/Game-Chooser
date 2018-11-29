import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import{FormsModule} from '@angular/forms';

import { GameListComponent } from './game-list.component';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';
import {IGame} from "./game"
import { HttpClientModule } from '@angular/common/http';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        GameListComponent,
      ],
      imports:[
        FormsModule,
        HttpClientModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('filter functionality', () => {

    let testGameList: IGame[]= [{
      "gameId": 1,
      "gameName": "Monopoly",
      "minPlayers": 2,
      "maxPlayers": 4,
      "genre": "Classic",
      "description": "Buy real estate and bankrupt your friends",
      "duration": "1.5 hours",
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    },
    {
      "gameId": 2,
      "gameName": "Fake Game",
      "minPlayers": 2,
      "maxPlayers": 4,
      "genre": "Resource Management",
      "description": "Buy gems, create the best collections, and attract the nobles.",
      "duration": "30 minutes",
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    },
    {
      "gameId": 3,
      "gameName": "New Game",
      "minPlayers": 3,
      "maxPlayers": 5,
      "genre": "Strategy",
      "description": "Align the stars to create constallations to summon Lovecraftian demons",
      "duration": "45 mintues",
      "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    }];
      describe('filterByGameName function ', () => {
      
      
        it('should return a list of games whose name matches search string', () => {
            var expectedList: IGame[] = [   {
              "gameId": 2,
              "gameName": "Fake Game",
              "minPlayers": 2,
              "maxPlayers": 4,
              "genre": "Resource Management",
              "description": "Buy gems, create the best collections, and attract the nobles.",
              "duration": "30 minutes",
              "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
            },
            {
              "gameId": 3,
              "gameName": "New Game",
              "minPlayers": 3,
              "maxPlayers": 5,
              "genre": "Strategy",
              "description": "Align the stars to create constallations to summon Lovecraftian demons",
              "duration": "45 mintues",
              "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
            }];

            var actualList: IGame[] = component.performFilter('game', 0, testGameList);
            expect(actualList).toEqual(expectedList);

        })

        it('should return an empty list when no games names match the serach', () => {
          var expectedList: IGame[] = [];

          var actualList: IGame[] = component.performFilter('zzz', 0, testGameList);

          expect(actualList).toEqual(expectedList);
        })

      });

      describe('filterByNumberOfPlayers function', () => {
        it('should return a list of games that can accomodate the selected number of players', () => {
            var expectedList: IGame[] = [{
              "gameId": 1,
              "gameName": "Monopoly",
              "minPlayers": 2,
              "maxPlayers": 4,
              "genre": "Classic",
              "description": "Buy real estate and bankrupt your friends",
              "duration": "1.5 hours",
              "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
            },
            {
              "gameId": 2,
              "gameName": "Fake Game",
              "minPlayers": 2,
              "maxPlayers": 4,
              "genre": "Resource Management",
              "description": "Buy gems, create the best collections, and attract the nobles.",
              "duration": "30 minutes",
              "imageUrl": "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
            }];
            
            var actualList: IGame[] = component.performFilter( '', 2, testGameList);

            expect(actualList).toEqual(expectedList);
          
        })

        it ('should return an empty list if no game can accomodate the selected number of players' , () =>{
            var expectedList: IGame[] = [];

            var actualList: IGame[] = component.performFilter('', 7, testGameList);

            expect(actualList).toEqual(expectedList);
        });

        it('should return the full list if the any option is selected', () => {
           var actualList: IGame[] = component.performFilter('', 0, testGameList);

           expect(actualList).toEqual(testGameList);
        });

        describe('isBetween function', () => {

          it('should return true if the given value is between the max and min', ()=>{
              expect(component.isBetween(1,3, 2)).toBe(true);
          });

          it('should return true if the given value is between the max and min inclusive ' , ()=>{
            expect(component.isBetween(1,3, 3)).toBe(true);
        });

          it('should return false if the given value is between the max and min', ()=>{
            expect(component.isBetween(1,3, 5)).toBe(false);
        });
        }
        )

      });

    
    });
  
 
});
