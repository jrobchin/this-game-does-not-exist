from torch import nn


class HeaderGenerator(nn.Module):
    NUM_CHANNELS = 3
    LATENT_VECTOR_SIZE = 100
    GEN_FMAP_SIZE = 64

    def __init__(self, ngpu):
        super(HeaderGenerator, self).__init__()
        self.ngpu = ngpu
        self.main = nn.Sequential(
            nn.ConvTranspose2d(self.LATENT_VECTOR_SIZE, self.GEN_FMAP_SIZE * 64, 4, 1, 0, bias=False),
            nn.BatchNorm2d(self.GEN_FMAP_SIZE * 64),
            nn.ReLU(True),
            
            nn.ConvTranspose2d(self.GEN_FMAP_SIZE * 64, self.GEN_FMAP_SIZE * 32, 4, 2, 1, bias=False),
            nn.BatchNorm2d(self.GEN_FMAP_SIZE * 32),
            nn.ReLU(True),

            nn.ConvTranspose2d(self.GEN_FMAP_SIZE * 32, self.GEN_FMAP_SIZE * 16, 4, 2, 1, bias=False),
            nn.BatchNorm2d(self.GEN_FMAP_SIZE * 16),
            nn.ReLU(True),

            nn.ConvTranspose2d(self.GEN_FMAP_SIZE * 16, self.GEN_FMAP_SIZE * 4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(self.GEN_FMAP_SIZE * 4),
            nn.ReLU(True),
            
            nn.ConvTranspose2d(self.GEN_FMAP_SIZE * 4, self.GEN_FMAP_SIZE * 2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(self.GEN_FMAP_SIZE * 2),
            nn.ReLU(True),
            
            nn.ConvTranspose2d(self.GEN_FMAP_SIZE * 2, self.GEN_FMAP_SIZE, 4, 2, 1, bias=False),
            nn.BatchNorm2d(self.GEN_FMAP_SIZE),
            nn.ReLU(True),

            nn.ConvTranspose2d(self.GEN_FMAP_SIZE, self.NUM_CHANNELS, 4, 2, 1, bias=False),
            nn.Tanh(),
        )

    def forward(self, input):
        return self.main(input)


class ScreenshotGenerator(nn.Module):
    NUM_CHANNELS = 3
    LATENT_VECTOR_SIZE = 100
    GEN_FMAP_SIZE = 64

    def __init__(self, ngpu):
        super(ScreenshotGenerator, self).__init__()
        self.ngpu = ngpu
        self.main = nn.Sequential(
            nn.ConvTranspose2d(self.LATENT_VECTOR_SIZE, self.GEN_FMAP_SIZE * 32, 4, 1, 0, bias=False),
            nn.BatchNorm2d(self.GEN_FMAP_SIZE * 32),
            nn.ReLU(True),
            
            nn.ConvTranspose2d(self.GEN_FMAP_SIZE * 32, self.GEN_FMAP_SIZE * 16, 4, 2, 1, bias=False),
            nn.BatchNorm2d(self.GEN_FMAP_SIZE * 16),
            nn.ReLU(True),

            nn.ConvTranspose2d(self.GEN_FMAP_SIZE * 16, self.GEN_FMAP_SIZE * 4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(self.GEN_FMAP_SIZE * 4),
            nn.ReLU(True),
            
            nn.ConvTranspose2d(self.GEN_FMAP_SIZE * 4, self.GEN_FMAP_SIZE * 2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(self.GEN_FMAP_SIZE * 2),
            nn.ReLU(True),
            
            nn.ConvTranspose2d(self.GEN_FMAP_SIZE * 2, self.GEN_FMAP_SIZE, 4, 2, 1, bias=False),
            nn.BatchNorm2d(self.GEN_FMAP_SIZE),
            nn.ReLU(True),

            nn.ConvTranspose2d(self.GEN_FMAP_SIZE, self.NUM_CHANNELS, 4, 2, 1, bias=False),
            nn.Tanh(),
        )

    def forward(self, input):
        return self.main(input)