var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

var engine = Engine.create();

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
    }
});

var boxA = Bodies.rectangle(window.innerWidth - 100, 200, 100, 100, {
    render: {
        sprite: {
            texture: '../img/ty.png'
        }
    },
    restitution: 2
});
var boxB = Bodies.rectangle(100, 200, 100, 100, {
    render: {
        sprite: {
            texture: '../img/fy.png'
        }
    }
});

var ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 30, window.innerWidth, 60, {
    isStatic: true
});
var box = Bodies.rectangle(window.innerWidth / 2, 200, window.innerWidth, 60);

function test() {
    World.add(engine.world, [box]);
}
World.add(engine.world, [boxA, boxB, ground]);

var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            // allow bodies on mouse to rotate
            angularStiffness: 0,
            render: {
                visible: false
            }
        }
    });

World.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;
Engine.run(engine);

Render.run(render);