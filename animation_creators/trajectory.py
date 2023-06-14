from manim import *

config.background_color = "#02006c"
config.format = "gif"
config.save_as_gif = True
config.frame_rate = 60


class Trajectory(MovingCameraScene):
    def construct(self):
        scale_factor = 0.8
        for i in range(20):
            state = MathTex(f"S_{i}", color=BLACK)
            circle = Circle(color=WHITE, fill_opacity=1)
            state_radius = circle.width / 2
            if i == 0:
                text = MathTex(f"\gamma_t R_t")
            else:
                text = MathTex(f"\gamma_{{t+{i}}}^{i+1} R_{{t+{i}}}")
            text.shift([0, -2, 0])
            state.shift([0, 2.5, 0])
            arrow = Arrow(color="#4a47ff", buff=0.3).next_to(circle)
            arrow.shift([0, 1.5 + state_radius, 0])
            circle.shift([0, 2.5, 0])
            square = Square(color="#E6AF2E", fill_opacity=1)
            square.scale(scale_factor ** (i - 1))
            g = VGroup(arrow, circle, state, square, text)
            # g.scale(scale_factor ** (i - 1))
            g.shift([(2 + g.width / 2) * i, 0, 0])
            self.play(g.animate.scale(1))
            self.play(self.camera.frame.animate.shift([3, 0, 0]))
        # text2 = MathTex("\gamma^2R_t")
        # text2.shift([0, -1.5, 0])
        # square2 = Square(color="#E6AF2E", fill_opacity=1)
        # g2 = Group(square2, text2)
        # self.play(g1.animate.scale(1))
        # g2.scale(scale_factor)
        # self.play(g2)
        # self.play(g1.animate.shift(RIGHT))
        # self.play(square.animate.shift(RIGHT))
        # self.play(square.animate.scale(scale_factor))
        # self.play(square.animate.shift(RIGHT))
        # self.play(square.animate.scale(scale_factor))
        # self.play(square.animate.shift(RIGHT))
        # self.play(square.animate.scale(scale_factor))
